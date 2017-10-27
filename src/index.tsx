import * as React from 'react'
import PropTypes from 'prop-types';
import './style.css'

/**
 * The structure accepted by sentences as options
 * @export
 * @interface Option
 */
export interface Option {
    id?: string
    value: string
    options?: Option[]
}

const blinkerStyle: React.CSSProperties = {
    verticalAlign: 'super',
    fontSize: 'smaller',
    margin: '0 -0.05em 0 0.05em',
    animation: 'sentence-crafter-blinker 1s ease-in-out infinite'
}
const SelectComponent = <T extends Option>  (props: {
    id?: string
    name?: string
    value?: string
    required?: boolean
    placeholder?: string
    options: T[]
    onValueChange?: (value:string) => void
}) => {
    let select: HTMLSelectElement
    let hiddenSelect: HTMLSelectElement
    let hiddenOption: HTMLOptionElement
    const onValueChange = props.onValueChange || ($=>$)
    const options = props.options || [];

    const resize = () => {
        if (!select || !hiddenSelect || !hiddenOption || !select.options[select.selectedIndex]) return;
        hiddenOption.innerText = select.options[select.selectedIndex].text;
        select.style.width = hiddenSelect.getBoundingClientRect().width + 'px'
    }

    return <span>
        <select
        className='sentence-crafter-input sentence-crafter-select sentence-crafter-input-hidden'
        ref={$=>{hiddenSelect=$;resize()}}>
            <option ref={$=>{hiddenOption=$;resize()}}></option>
        </select>
        <select className='sentence-crafter-input sentence-crafter-select'
            id={props.id}
            value={props.value||''}
            style={props.value?{}:blinkerStyle}
            name={props.name}
            ref={$=>{select=$;resize()}}
            onChange={e =>{onValueChange(e.target.value)}}>
            <option
            className='sentence-crafter-option'
            value={''} disabled={props.required}>{props.placeholder||'▾'}</option>
            {options.map(({id, value}) =>
                <option
                className='sentence-crafter-option'
                key={id}
                value={id}>{value}</option>
            )}
        </select>
    </span>
}

export interface SelectionsObject {
    [x: string]: Option | Option[] | Selections
}
/**
 * Type of a set of selected options
 *
 * @export
 * @interface Selections
 */
export type Selections = SelectionsObject | SelectionsObject[]

/**
 * Configures a select component for a sentence set
 *
 * @export
 * @interface SelectConfigObject
 * @template T
 * @template Selections
 */
export interface SelectConfigObject<T extends Selections> {
    /**
     * Maps to the id/name of the select
     *
     * @type {string}
     * @memberOf SelectConfigObject
     */
    id: string | number,
    /**
     * Get a set of options for the component given the current selections
     *
     * @memberOf SelectConfigObject
     */
    getOptions?: (selections: T) => Option[],
    /**
     * Get a list of SelectConfigs to be used
     *
     * @memberOf SelectConfigObject
     */
    getConfigs?: (selections: T, id:string) => SelectConfig<T>[],
    /**
     * Defines whether the select component requires an input or is allowed to
     * be empty.
     *
     * @default false
     * @type {boolean}
     * @memberOf SelectConfigObject
     */
    required?: boolean
    /**
     * Defines whether the select component expands as a list
     *
     * @default false
     * @type {boolean}
     * @memberOf SelectConfigObject
     */
    list?: boolean
    /**
     * If the component is a list and getConfigs is defined, then this defines
     * the condition on the last sub-component must satisfy for the next
     * sub-component to render
     *
     * @default false
     * @type {boolean}
     * @memberOf SelectConfigObject
     */
    listContinuationCondition?: <K extends keyof T>(selections: T[K]) => boolean
}

export type SelectConfig<T extends Selections=Selections> =
    SelectConfigObject<T> | ((selections: T, id: string) => React.ReactNode)

export interface SentenceProps<T extends Selections=Selections> {
    id: string
    choices: { [x: string]: string }
    config: SelectConfig<T>[]
}

interface SentenceState<T extends Selections> {
    choices?: { [x: string]: string }
    selections: T,
    components: React.ReactNode[],
}
export class Sentence<T extends Selections> extends React.PureComponent<SentenceProps<T>, SentenceState<T>> {
    constructor(props: SentenceProps<T>){
        super(props)
        this.state = {
            choices: this.props.choices || {} as { [x: string]: string },
            selections: {} as T,
            components: [] as React.ReactNode[]
        }
    }
    componentWillMount(){
        this.updateSelections()
    }
    parseSelectConfig = (prefix) => ({
        selections, components
    }: SentenceState<T>, config: SelectConfig, i: number) => {
        if (typeof config === 'function') {
            const element = config(selections, prefix)
            if (element) {
                components.push(element)
            }
            return { selections, components }
        } else {
            const {
                id:suffix,
                getOptions,
                getConfigs,
                required,
                list,
                listContinuationCondition,
            } = config
            const id = prefix + '.' + suffix
            if (getConfigs){
                const configs = getConfigs(selections, prefix);
                if(configs) {
                    if (list) {
                        const prev = selections[suffix]
                        selections[suffix] = []
                        for (let idx = 0, r, cont=true; cont; idx++) {
                            const r = configs.reduce(this.parseSelectConfig(id+'.'+idx), {
                                selections: (prev && prev[idx]) || {} as T,
                                components: components as React.ReactNode[]
                            })
                            selections[suffix].push(r.selections)
                            cont = listContinuationCondition(r.selections)
                        }
                    } else {
                        const r = configs.reduce(this.parseSelectConfig(id), {
                            selections: selections[suffix] || {} as T,
                            components: components as React.ReactNode[]
                        })
                        selections[suffix] = r.selections
                    }
                }
            } else if (getOptions){
                if (list) {
                    selections[suffix] = []
                    for (let idx = 0, selection, cont=true; cont; idx++) {
                        selection = this.processOptions(id+'.'+idx, {
                            selections,
                            components
                        }, config)
                        console.log('selection',id+'.'+idx,selection)
                        if (selection) {
                            selections[suffix].push(selection)
                        }
                        cont = selection && !!selection.id
                    }
                } else {
                    selections[suffix] = this.processOptions(id, {
                        selections,
                        components
                    }, config) || selections[suffix]
                    console.log('[setSelection]', id, selections[suffix])
                }
            }
            return { selections, components }
        }
    }
    /**
     * Process 'getOptions' from Sentence config
     * Note this mutates the state inputs
     */
    processOptions(
        id: string,
        {selections, components}: SentenceState<T>,
        {id:suffix, getOptions,required}: SelectConfigObject<T>
    ){
        console.log('processOptions',id, selections)
        const availableOptions = getOptions(selections)
        // Only show the select if there are options
        if (availableOptions) {
            components.push(
                <SelectComponent
                required={required}
                key={id}
                onValueChange={value=>this.setState({
                    choices: {...this.state.choices, [id]: value }
                }, () => {
                    this.updateSelections()
                })}
                name={id}
                id={id}
                value={this.state.choices[id]}
                options={availableOptions} />)
            return availableOptions.find(option => option.id === this.state.choices[id])
        }
    }
    updateSelections(){
        const {
            id: prefix='',
            config,
            children,
        } = this.props

        const state: SentenceState<T> = config.reduce(this.parseSelectConfig(prefix), {
            selections: this.state.selections,
            components: []
        })

        console.log('[next]', state.components.length)
        console.log('[prev]',this.state.components.length)
        console.log('[next-sel]',this.state.selections)
        if (state.components.length !== this.state.components.length) {
            this.setState(state, () => {
                this.updateSelections()
            })
        } else {
            this.setState(state)
        }
    }
    render (){
        return <span className="sentence-crafter">
            {this.state.components}
        </span>
    }
}

export const SelectSwitchCase: React.StatelessComponent<{ id: string, value:string, children?: React.ReactNode }> =(props) => null