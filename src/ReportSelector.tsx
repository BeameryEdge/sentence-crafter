import * as React from 'react';
import { Sentence, Option, Word, List, Phrase, SelectionsObject, PhraseContext, Input } from './index'

class DynamicInput extends Input<{}, { id: string, type?: string }> {
    hiddenSpan: HTMLSpanElement
    resize = (input: HTMLInputElement) => {
        if (!input || !this.hiddenSpan || this.props.type === 'date') return
        this.value = input.value
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
                type={this.props.type || 'text'}
                key={key}
                name={key}
                id={key}
                ref={$=>this.resize($)}
                onChange={e=>this.resize(e.target)}
                value={this.value || ''}/>
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
            className='sentence-crafter-input sentence-crafter-date-input'
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
export class NumberField extends Field {
    conditions = [
        {id: 'gt', value: 'greater than'},
        {id: 'lt', value: 'less than'},
    ]
    Query(){
        return <DynamicInput key='value' id='value' type='number'/>
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
    subFieldProp?: Field
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
            <Word id='subFieldProp' required getOptions={({ fieldId }) =>
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

const getQueryField = ({ fieldId, subFieldProp }: {
    fieldId?: Field
    subFieldProp?: Field
}) => (
    fieldId && (
        fieldId instanceof NestedField ?
            subFieldProp :
            fieldId
    )
)

const intervals = [
    { id: '1', value: 'Precise' },
    { id: '10', value: 'Intervals of 10' },
    { id: '100', value: 'Intervals of 100' },
    { id: '1000', value: 'Intervals of 1000' },
]

const dateIntervals = [
    { id: 'year', value: 'Year' },
    { id: 'month', value: 'Month' },
    { id: 'day', value: 'Day' },
    { id: 'hour', value: 'Hour' },
    { id: 'minutes', value: 'Minute' },
    { id: 'seconds', value: 'Second' },
    { id: 'milliseconds', value: 'Millisecond' },
]

interface ReportSelections extends SelectionsObject {
    chart: Chart
    table: Table
    group: {
        dateInterval: Option
        fieldId: Field
        subFieldProp: Field
    }
    split: {
        fieldId: Field
        subFieldProp: Field
    }
}

const ReportSelector: React.StatelessComponent<{ charts: Chart[], choices: {[x:string]: string } }> = ({ charts, choices }) => (
    <Sentence id='report' choices={choices}>
        <Word id='chart' required getOptions={() => charts } />
        <Word id='table' placeholder='table' required getOptions={({ chart }) =>
            chart && chart.tables }/>
        <Word id='doQuery' placeholder='(+filter)' getOptions={({ table }) =>
            table && [{id:'where', value: 'where'}] }/>
        <Alternatives />
        <span key='grouped by'>grouped by</span>
        <Phrase id='group' >{({ table }: { table: Table }) => table && <span>
            <Word id='dateInterval' required getOptions={({ fieldId, subFieldProp }) =>
                getQueryField({ fieldId, subFieldProp }) instanceof DateField && dateIntervals }/>
            <Word id='interval' required getOptions={({ fieldId, subFieldProp }) =>
                getQueryField({ fieldId, subFieldProp }) instanceof NumberField && intervals }/>
            <Word id='fieldId' required getOptions={() => table.fields }/>
            <Word id='subFieldProp' required getOptions={({ fieldId }) =>
                fieldId instanceof NestedField && fieldId.subFields }/>
        </span>}</Phrase>
        <Word id='doSplit' placeholder='(+split)' getOptions={({ table, group }) =>
            group && table && [{id:'split by', value: 'split by'}] }/>
        <Phrase id='split' >{({ table, group, doSplit }: ReportSelections) =>
            table && doSplit && group && <span>
            <Word id='fieldId' required getOptions={() =>
                table.fields.filter(field =>
                    field.id !== group.fieldId.id &&
                    !(field instanceof DateField)) }/>
            <Word id='subFieldProp' required getOptions={({ fieldId }) =>
                fieldId instanceof NestedField &&
                fieldId.subFields }/>
        </span>}</Phrase>
    </ Sentence>
)
export default ReportSelector;
