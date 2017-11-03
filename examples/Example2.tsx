import * as React from 'react';
import { Sentence, Option, Word, List, Phrase, SelectionsObject, PhraseContext, Input } from '../src/index'

class DynamicInput extends Input<{}, { id: string, type?: string }> {
    hiddenSpan: HTMLSpanElement
    resize = (input: HTMLInputElement) => {
        if (!input || !this.hiddenSpan || this.props.type === 'date') return
        this.hiddenSpan.innerText = input.value ? input.value+'.' : input.placeholder;
        const {width, height} = this.hiddenSpan.getBoundingClientRect()
        input.style.width = (width) + 'px'
    }
    render(){
        const key = this.getKey()
        return (
            <span>
                <span  ref={$ => this.hiddenSpan = $} style={{
                    minWidth: '20px',
                    position: 'absolute',
                    visibility: 'hidden'
                }}></span>
                <input
                className='sentence-crafter-input'
                placeholder='<blank>'
                type={this.props.type}
                key={key}
                name={key}
                id={key}
                ref={$=>this.resize($)}
                onChange={e=>this.resize(e.target)}
                value={this.value}/>
            </span>
        )
    }
}

class DateInput extends Input<{}, { id: string, type?: string }> {
    onValueChange(input: HTMLInputElement){
        if (input) this.value = input.value
    }
    render(){
        const key = this.getKey()
        return (
            <input
            className='sentence-crafter-input'
            placeholder='<blank>'
            type='date'
            key={key}
            name={key}
            id={key}
            ref={$=>this.onValueChange($)}
            onChange={e=>this.onValueChange(e.target)}
            value={this.value}/>
        )
    }
}

class Table implements Option {
    constructor(public id: string, public value: string, public fields?: Option[]){}
}
class Field implements Option {
    conditions = [
        {id: 'eq', value: 'is'},
        {id: 'neq', value: 'is not'},
    ]
    constructor(public id: string, public value: string){}
    Query(){
        return <DynamicInput key='value' id='value'/>
    }
}
class DateField extends Field {
    conditions = [
        {id: 'gt', value: 'after'},
        {id: 'lt', value: 'before'},
    ]
    Query(){
        return <DateInput key='value' id='value'/>
    }
}
class BooleanField extends Field {}
class MultiChoiceField extends Field {
    constructor(id: string, value: string, public options: Option[]){
        super(id, value)
    }
    Query(){
        return <Word id='value' placeholder='(blank)' getOptions={() =>  this.options}/>
    }
}
class NestedField extends Field {
    constructor(id: string, value: string, public subFields: Field[]){
        super(id, value)
    }
}
const companyList = [new Field('c1', 'Company 1')]
const companyIdField = new MultiChoiceField('companyId', 'Company', companyList)
const intervals = [
    { id: 'year', value: 'Year' },
    { id: 'month', value: 'Month' },
    { id: 'day', value: 'Day' },
    { id: 'hour', value: 'Hour' },
    { id: 'minutes', value: 'Minute' },
    { id: 'seconds', value: 'Second' },
    { id: 'milliseconds', value: 'Millisecond' },
]
const users = new Table('users', 'Users', [
    companyIdField,
    new DateField('createdAt', 'Created'),
    new DateField('updatedAt', 'Updated'),
    new BooleanField('credentials.verified', 'Whether Verified'),
    new MultiChoiceField('role', 'Access Level', [
        new Field('admin', 'Admin'),
        new Field('restricted', 'Restricted'),
        new Field('team_member', 'Team Member'),
        new Field('limited', 'Limited'),
    ]),
]);
const companies = new Table('companies', 'Companies', [
    new DateField('created_at', 'Created'),
    new Field('plan.inherit', 'Base Plan'),
]);
const contacts = new Table('contacts', 'Contacts', [
    new Field('type', 'Type'),
    companyIdField,
    new Field('status.value', 'Status'),
    new NestedField('vacancies', 'Vacancy', [
        new Field('value', 'Name'),
        new Field('stage.value', 'Stage'),
    ]),
    new Field('creationSource.value', 'Creation Source'),
    new DateField('createdAt', 'Created'),
    new DateField('updatedAt', 'Updated'),
]);
const activities = new Table('activities', 'Activities', [
    companyIdField,
    new Field('eventType', 'Event table'),
    new DateField('published', 'Ocurred'),
    new Field('actor.name', 'Actor'),
    new Field('object.name', 'Object'),
    new Field('target.name', 'Target'),
]);
interface Chart extends Option {
    tables: Table,
}
const charts = [{
    id: 'count',
    value: 'Count',
    tables: [ users, companies, contacts, activities ]
}]

interface QuerySelections extends SelectionsObject {
    fieldId?: Field
    subFieldId?: Field
    op?: Option
    cont?: Option
}
const getQueryField = ({ fieldId, subFieldId }: {
    fieldId?: Field
    subFieldId?: Field
}) => (
    fieldId && (
        fieldId instanceof NestedField ?
            subFieldId :
            fieldId
    )
)
interface AlternativesSelections extends SelectionsObject {
    cont?: Option
    query?: QuerySelections[]
}
const Query = ({ table }) => {
    return <List id='query'>{({ doQuery, query }, idx) =>
        (idx === 0 || (query[idx-1] && query[idx-1].cont)) &&
        <Phrase key={idx} id={idx}>{(query: QuerySelections[]) => <span>
            <Word id='fieldId' required getOptions={() =>
                query ?
                    table.fields.filter(({id}) =>
                        !query.slice(0, idx).find(({ fieldId }) =>
                            fieldId && fieldId.id === id)) :
                            table.fields }/>
            <Word id='subFieldId' required getOptions={({ fieldId }) =>
                fieldId instanceof NestedField && fieldId.subFields }/>
            <Word id='op' required getOptions={({ fieldId }: { fieldId: Field}) =>
                fieldId && fieldId.conditions } />
            {query[idx].fieldId && query[idx].fieldId.Query()}
            <Word id='cont' placeholder='(+and)' getOptions={({ op }) =>
                op && query.length < (table.fields.length-1) && [{id:'and', value: ', and'}] }/>
        </span>}</Phrase>
    }</List>
}
const Alternatives = () => {
    return <List id='alternatives'>{({ table, doQuery, alternatives }, idx) =>
        table && doQuery && (idx === 0 || (alternatives[idx-1] && alternatives[idx-1].cont)) &&
        <Phrase key={idx} id={idx}>{(query: QuerySelections[]) => <span>
            <Query table={table}/>
            <Word id='cont' placeholder='(+or)' getOptions={({ query }) =>
                query &&
                query.length &&
                query[query.length-1].fieldId &&
                [{id:'or', value: '; or'}] }/>
        </span>}</Phrase>
    }</List>
}
interface AggregatorSelections extends SelectionsObject {
    fieldId: Field
    subFieldId?: Field
    dateInterval?: Option
}
interface ReportSelections extends SelectionsObject {
    chart: Chart
    table: Table
    doQuery?: Option
    alternatives?: AlternativesSelections[]
    group: AggregatorSelections
    doSplit?: Option
    split?: AggregatorSelections
}
class Example extends React.Component {
    render() {
        return (
            <form style={{
                textAlign: 'center'
            }}>
            <Sentence id='report' choices={choices}>
                <Word id='chart' required getOptions={() => charts } />
                <Word id='table' placeholder='table' required getOptions={({ chart }) =>
                    chart && chart.tables }/>
                <Word id='doQuery' placeholder='(+filter)' getOptions={({ table }) =>
                    table && [{id:'where', value: 'where'}] }/>
                <Alternatives />
                <span key='grouped by'>grouped by</span>
                <Phrase id='group' >{({ table }) => table && <span>
                    <Word id='dateInterval' required getOptions={({ fieldId, subFieldId }) =>
                        getQueryField({ fieldId, subFieldId }) instanceof DateField && intervals }/>
                    <Word id='fieldId' required getOptions={() => table.fields }/>
                    <Word id='subFieldId' required getOptions={({ fieldId }) =>
                        fieldId instanceof NestedField && fieldId.subFields }/>
                </span>}</Phrase>
                <Word id='doSplit' placeholder='(+split)' getOptions={({ table, group }) =>
                    group && table && [{id:'split by', value: 'split by'}] }/>
                <Phrase id='split' >{({ table, group, doSplit }) =>
                    table && doSplit && group && <span>
                    <Word id='fieldId' required getOptions={() =>
                        table.fields.filter(field =>
                            field.id !== group.fieldId.id &&
                            !(field instanceof DateField)) }/>
                    <Word id='subFieldId' required getOptions={({ fieldId }) =>
                        fieldId instanceof NestedField &&
                        fieldId.subFields }/>
                </span>}</Phrase>
            </ Sentence>
            <input type="submit" value="Save"/>
            </form>
        )
    }
}

export default Example;

function parse(a: string[]) {
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        var key = decodeURIComponent(p[0])
        if (p.length == 1)
            b[key] = "";
        else
            b[key] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}
const choices = parse(window.location.search.substr(1).split('&'));
