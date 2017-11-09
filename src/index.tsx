import * as React from 'react'
import PropTypes from 'prop-types';
import './style.css'

/**
 * The structure accepted by sentences as options
 * @export
 * @interface Option
 */
export interface Option {
    id: string
    value: string
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
            ref={$=>{select=$;$&&onValueChange($.value);resize()}}
            onChange={e =>{onValueChange(e.target.value)}}>
            {props.required || <option
            className='sentence-crafter-option'
            value=''>{props.placeholder||'▾'}</option>}
            {options.map(({id, value}) =>
                <option
                className='sentence-crafter-option'
                key={id}
                value={id}>{value}</option>
            )}
        </select>
    </span>
}
export type Selection = Option | Selections
export type SelectionsObject = { [x: string]: Selection }
export type SelectionList = Option[] | SelectionsObject[]
export type Selections = SelectionsObject | SelectionList
/**
 * Configures a property of a phase set
 *
 * @export
 * @interface SelectionProps
 * @template T
 * @template Selections
 */
export interface SelectionProps<T extends Selections> {
    /**
     * Maps to the id/name of the property of the phrases
     */
    id: string | number,
}
// Phrase Context
export interface PhraseContext<S extends Selections> {
    parentId: string,
    selectOption: (id: string|number, selection: Option) => boolean,
    setSelection: (id: string|number, f:(prevSelection: Selection) => Selection) => void,
    selections: S
    choices: { [x: string]: string }
}
export const phraseContextTypes = {
    parentId: PropTypes.string.isRequired,
    selectOption: PropTypes.func.isRequired,
    setSelection: PropTypes.func.isRequired,
    selections: PropTypes. PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]),
    choices: PropTypes.object.isRequired
}


export abstract class Input<T extends Selections=Selections, P extends SelectionProps<T>=SelectionProps<T>, S={}> extends React.Component<P, S> {
    context: PhraseContext<T>
    componentDidMount(){
        const {id} = this.props
        const preSelectedChoice = this.context.choices[this.getKey()]
        const weMadeSelection = this.context.selections.hasOwnProperty(id)
        this.value = !weMadeSelection && preSelectedChoice
    }
    static contextTypes = phraseContextTypes
    props: P & { children?: React.ReactNode  }
    getKey(){
        const {parentId} = this.context
        const {id} = this.props
        return typeof id ==='string' ? parentId + '.' + id : parentId + '[' + id + ']'
    }
    set value(value: string){
        const {id} = this.props
        const {selectOption, setSelection} = this.context

        const selection = { id: value } as Option
        this.context.selectOption(this.props.id, selection) &&
            this.context.setSelection(this.props.id, () => selection)
    }
    get value(): string {
        return this.context.selections[this.props.id] &&
            this.context.selections[this.props.id].id
    }
    abstract render()
}

// WORD
/**
 * Properties for a single 'word' select component
 */
export interface WordProps<T extends Selections> extends SelectionProps<T> {
    /**
     * Defines whether the select component requires an input or is allowed to
     * be empty.
     * @default false
     */
    required?: boolean
    /**
     * String to use as a placeholder when no value selected
     * @default '▾'
     */
    placeholder?: string;
    /**
     * Get a set of options for the component given the current selections
     */
    getOptions: (selections: T) => Option[],
}
export class Word<T extends Selections> extends React.Component<WordProps<T>, { options: Option[], selected: Option }>{
    static contextTypes = phraseContextTypes
    context: PhraseContext<T>
    onValueChange = (options, value) =>{
        const {id} = this.props
        const {selectOption, setSelection} = this.context
        const preSelectedChoice = this.context.choices[this.getKey()]
        const preSelection = !this.context.selections.hasOwnProperty(id) &&
            preSelectedChoice &&
            options.find(({id}) => id === preSelectedChoice)

        const selection = preSelection || options.find(({id}) => id === value)
        selectOption(id, selection) && setSelection(id, () => selection)
    }
    getOptions(){
        return this.props.getOptions(this.context.selections)
    }
    getKey(){
        const {parentId} = this.context
        const {id} = this.props
        return typeof id ==='string' ? parentId + '.' + id : parentId + '[' + id + ']'
    }
    get value(): string {
        return this.context.selections[this.props.id] &&
            this.context.selections[this.props.id].id
    }
    render(){
        const { placeholder, required } = this.props
        const options = this.getOptions()
        // Only show the select if there are options
        if (options) {
            const key = this.getKey()
            return (
                <SelectComponent
                required={required}
                key={key}
                name={key}
                id={key}
                placeholder={placeholder}
                onValueChange={value=>this.onValueChange(options,value)}
                value={this.value}
                options={options} />
            )
        } else return null
    }
}

abstract class AbstractPhrase<T extends Selections, U extends Selections, P extends SelectionProps<T>=SelectionProps<T>, S=never> extends React.Component<P, S> {
    static contextTypes = phraseContextTypes
    context: PhraseContext<T>
    static childContextTypes = phraseContextTypes
    getChildContext(): PhraseContext<U> {
        const self = this;
        return {
            get parentId(){
                const parent = self.context.parentId
                const child = self.props.id
                return typeof child ==='string' ?
                    parent+ '.' + child :
                    parent + '[' + child + ']'
            },
            setSelection: (id: number | string, f:(prevSelection: Selection)=>Selection) => {
                this.context.setSelection(this.props.id, (prevSelections: U) => this.updateSelections(id, f, prevSelections))
            },
            selectOption: (id: string | number, selection: Option) => {
                const parent = this.props.id
                const child = id
                const key = typeof child ==='string' ?
                    parent+ '.' + child :
                    parent + '[' + child + ']'
                return this.context.selectOption(this.props.id + '.' + id, selection)
            },
            get selections(){ return self.context.selections[self.props.id as (string| number)] },
            get choices(){ return self.context.choices }
        }
    }
    componentWillMount(){
        this.context.setSelection(this.props.id, () => this.getInitialSelections())
    }
    // shouldComponentUpdate(nextProps, nextState, nextContext){
    //     return this.context !== nextContext || super.shouldComponentUpdate(nextProps, nextState, this.context)
    // }
    abstract getInitialSelections(): U
    abstract updateSelections(id: number | string, f:(prevSelections: Selection)=>Selection, prevSelection: U): U
}


// Sentence
export interface SentenceProps<T extends SelectionsObject> extends SelectionProps<{ [x:string]: SelectionsObject }> {
    choices: { [x: string]: string }
    children: React.ReactNode
}
interface SentenceState<T extends SelectionsObject> {
    choices?: { [x: string]: string }
    selections: T,
}

export class Sentence<T extends SelectionsObject> extends React.Component<SentenceProps<T>, SentenceState<T>>{
    constructor(props: SentenceProps<T>){
        super(props)
        this.state = {
            choices: {} as { [x: string]: string },
            selections: {} as T,
        }
    }
    static childContextTypes = AbstractPhrase.contextTypes
    getChildContext(): PhraseContext<T> {
        return {
            parentId: this.props.id as string,
            setSelection: (id: number | string, f:(prevSelection: Selection)=>Selection) => {
                this.setState(({ selections }: SentenceState<T>) => ({
                    selections: {...(selections as Object), [id]: f(selections[id]) }
                }))
            },
            selectOption: (id: string | number, selection: Option) => {
                const key = this.props.id+'.'+id
                const currValue = this.state.choices[key]
                if (currValue === (selection && selection.id)) return false;
                this.setState(({ choices }) => {
                    const currValue = choices[key]
                    if (currValue === (selection && selection.id)) return;
                    return {
                        choices: {...choices, [key]: selection && selection.id },
                    }
                })
                return true;
            },
            selections: this.state.selections,
            choices: this.props.choices
        }
    }
    render (){
        return <span className="sentence-crafter">
            {this.props.children}
        </span>
    }
}

// LIST
export interface ListProps<T extends Selections> extends SelectionProps<T> {
    children: (selections: T, idx:number) => React.ReactNode
}
export class List<T extends Selections> extends AbstractPhrase<T, SelectionList, ListProps<T>>{
    getInitialSelections(){
        return []
    }
    updateSelections(idx: number, f:(prevSelection: Selection)=>Selection, prevSelection: SelectionList){
        return [
            ...prevSelection.slice(0, idx),
            f(prevSelection[idx]),
            ...prevSelection.slice(idx+1),
        ] as SelectionList
    }
    render(){
        const currSelection = this.context.selections[this.props.id] as (Option | SelectionsObject)[]
        if (Array.isArray(currSelection)) {
            const components = []
            for (let idx = 0, cont=true; cont; idx++) {
                const component = this.props.children(this.context.selections, idx)
                if (!component) break;
                components.push(component)
                cont = !!currSelection[idx]
            }
            return <span>{components}</span>
        } else return null
    }
}

// Phrase
export interface PhraseProps<T extends Selections> extends SelectionProps<T> {
    children: (selections: T) => React.ReactNode
}
export class Phrase<T extends Selections=Selections, S extends SelectionsObject=SelectionsObject> extends AbstractPhrase<T, SelectionsObject, PhraseProps<T>>{
    getInitialSelections(){
        return {}
    }
    updateSelections(id: string, f: (prevSelection:Selection) => Selection, currSelection: SelectionsObject){
        return {...currSelection, [id]: f(currSelection[id]) }
    }
    render(){
        const currSelection = this.context.selections[this.props.id] as S
        if (currSelection) {
            return <span>{this.props.children(this.context.selections)}</span>
        } else return null
    }
}
