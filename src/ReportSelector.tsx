import * as React from 'react';
import { Sentence, Option, Word, List, Phrase, SelectionsObject, PhraseContext, Input } from './index'

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

export class Field implements Option {
    conditions = [
        {id: 'eq', value: 'is'},
        {id: 'neq', value: 'is not'},
    ]
    constructor(public id: string, public value: string){}
    Query(){
        return <DynamicInput key='value' id='value'/>
    }
}
export class DateField extends Field {
    conditions = [
        {id: 'gt', value: 'after'},
        {id: 'lt', value: 'before'},
    ]
    Query(){
        return <DateInput key='value' id='value'/>
    }
}
export class BooleanField extends Field {}
export class MultiChoiceField extends Field {
    constructor(id: string, value: string, public options: Option[]){
        super(id, value)
    }
    Query(){
        return <Word id='value' placeholder='(blank)' getOptions={() =>  this.options}/>
    }
}
export class NestedField extends Field {
    constructor(id: string, value: string, public subFields: Field[]){
        super(id, value)
    }
}

interface QuerySelections extends SelectionsObject {
    fieldId?: Field
    subFieldId?: Field
    op?: Option
    cont?: Option
}

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
        <Phrase key={idx} id={idx}>{() => <span>
            <Query table={table}/>
            <Word id='cont' placeholder='(+or)' getOptions={({ query }) =>
                query &&
                query.length &&
                query[query.length-1].fieldId &&
                [{id:'or', value: '; or'}] }/>
        </span>}</Phrase>
    }</List>
}

export class Table implements Option {
    constructor(public id: string, public value: string, public fields?: Option[]){}
}
export interface Chart extends Option {
    tables: Table[],
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

const intervals = [
    { id: 'year', value: 'Year' },
    { id: 'month', value: 'Month' },
    { id: 'day', value: 'Day' },
    { id: 'hour', value: 'Hour' },
    { id: 'minutes', value: 'Minute' },
    { id: 'seconds', value: 'Second' },
    { id: 'milliseconds', value: 'Millisecond' },
]

const ReportSelector: React.StatelessComponent<{ charts: Chart[], choices: {[x:string]: string } }> = ({ charts, choices }) => (
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
)
export default ReportSelector;
