import * as React from 'react'
import PropTypes from 'prop-types';
import './style.css'

export interface Option {
    id?: string
    value: string
    children?: React.ReactChildren
    options?: Option[]
}
const blinkerStyle: React.CSSProperties = {
    animation: 'sentence-crafter-blinker 2s ease-in-out infinite'
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
            onChange={e =>{onValueChange(e.target.value)}}
            onBlur={e =>{onValueChange((e.target as HTMLSelectElement).value)}}>
            <option
            className='sentence-crafter-option'
            value={''} disabled={props.required}>{props.placeholder||''}</option>
            {options.map(({id, value}) =>
                <option
                className='sentence-crafter-option'
                key={id}
                value={id}>{value}</option>
            )}
        </select>
    </span>
}

export interface SelectorProps<T extends Option> {
    ids: string[]
    placeholder?: string
    required?: boolean
    filter?: (option: T) => boolean
    pre?: (...options: T[]) => React.ReactNode
    options?: T[]
    optionGetters?: ((...selections: T[]) => T[])[]
    children?: React.ReactNode | ((...options: T[]) => React.ReactNode)
}

export interface SentenceContext {
    setChoice: (id: string, value: string) => void,
    getChoice: (id: string) => string
}
export class Sentence extends React.Component<{
    choices?: { [x: string]: string }
}, { [x: string]: string }> {
    constructor(props){
        super(props)
        this.state = props.choices || {}
    }
    static childContextTypes = {
        setChoice: PropTypes.func,
        getChoice: PropTypes.func
    }
    getChildContext(): SentenceContext {
        return {
            setChoice: (id: string, value: string) => this.setState({[id]: value}),
            getChoice: (id: string) => this.state[id]
        };
    }
    render(){
        return <span className="sentence-crafter">{this.props.children}</span>
    }
}

export class Selector<T extends Option> extends React.PureComponent<SelectorProps<T>> {
    static contextTypes = Sentence.childContextTypes
    context: SentenceContext;
    render (){
        const {
            filter=$=>true,
            ids=[],
            pre=()=>null,
            children,
            required=false,
            placeholder= '▾',
            options=React.Children.toArray(this.props.children)
            .filter((child: React.ReactElement<T>) =>
                child && child.type === SelectSwitchCase)
            .map((child: React.ReactElement<T>) => child.props),
            optionGetters=[],
        } = this.props

        let availableOptions = options.filter(filter)

        const components = [] as React.ReactNode[]

        const selections = [] as T[]

        let selected = false
        for (var i = 0; i < ids.length; i++) {
            if (!availableOptions) break
            let id = ids[i]
            selected = !required
            components.push(
                <SelectComponent
                required={required}
                key={id}
                placeholder={placeholder}
                onValueChange={value=>this.context.setChoice(id, value)}
                name={id}
                id={id}
                value={this.context.getChoice(id)}
                options={availableOptions} />)

            let selection = availableOptions.find(option => option.id === this.context.getChoice(id))
            selections.push(selection)
            availableOptions = null
            if (selection && selection.id) {
                selected = true
                if (selection.options) {
                    availableOptions = selection.options as T[]
                    continue
                }
            }
            if (optionGetters[i]) {
                availableOptions = optionGetters[i](...selections)
                continue
            }

            break
        }
        console.log(selections, selected)

        const prefix = selected && pre(...selections)
        const rest = selected && (
            (typeof children === 'function' && children(...selections)) ||
            (selections[0] && selections[0].children)
        )

        return <span>
            {prefix}
            {components}
            {rest}
        </span>
    }
}

export const SelectSwitchCase: React.StatelessComponent<{ id: string, value:string, children?: React.ReactNode }> =(props) => null