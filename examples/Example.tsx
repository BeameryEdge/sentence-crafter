import * as React from 'react';
import { Sentence, Selector, Option } from '../src/index'

const wordToOption = (x:string) => ({ id:x, value:x })

interface Noun extends Option {
    type: 's'|'p'
}
const nouns = [
    { s:'time', p:'times' },
    { s:'person', p:'people' },
    { s:'year', p:'years' },
    { s:'way', p:'ways' },
    { s:'day', p:'days' },
    { s:'thing', p:'things' },
    { s:'man', p:'men' },
    { s:'world', p:'worlds' },
    { s:'life', p:'lives' },
    { s:'hand', p:'hands' },
    { s:'part', p:'parts' },
    { s:'child', p:'children' },
    { s:'eye', p:'eyes' },
    { s:'woman', p:'women' },
    { s:'place', p:'places' },
    { s:'work', p:'works' },
    { s:'week', p:'weeks' },
    { s:'case', p:'cases' },
    { s:'point', p:'points' },
    { s:'government', p:'governments' },
    { s:'company', p:'companies' },
    { s:'number', p:'numbers' },
    { s:'group', p:'groups' },
    { s:'problem', p:'problems' },
    { s:'fact', p:'facts' },
]
.reduce(({s, p, b}, {s:ns, p:np}) => ({
    s: s.concat([{
        id: ns,
        type: 's' as 's',
        value: ns
    }]),
    p: p.concat([{
        id: ns,
        type: 's' as 's',
        value: np
    }]),
    b: b.concat([{
        id: ns,
        type: 's' as 's',
        value: ns
    }, {
        id: np,
        type: 's' as 's',
        value: np
    }])
}), {
    s: [] as Noun[],
    p: [] as Noun[],
    b: [] as Noun[],
})

const startsWithVowel = (x: Noun) => 'aeiou'.indexOf(x.value[0]) >= 0
const startsWithConsonant = (x: Noun) => 'aeiou'.indexOf(x.value[0]) === -1

const determiners = [
    { id: 'the', type: 's' },
    { id: 'a', type: 's' },
    { id: 'an', type: 's' },
    { id: 'this', type: 's' },
    { id: 'that', type: 's' },
    { id: 'these', type: 'p' },
    { id: 'those', type: 'p' },
    { id: 'my', type: 'b' },
    { id: 'your', type: 'b' },
    { id: 'his', type: 'b' },
    { id: 'her', type: 'b' },
    { id: 'its', type: 'b' },
    { id: 'our', type: 'b' },
    { id: 'their', type: 'b' },
]
.map(({id, type}) =>({
    id,
    type,
    value: id,
}))

const getNounsFromDeterminer = (det: { id: string, type: string}) =>{
    if (!det) {
        return []
    } else {
        const { id, type } = det
        return id === 'a' ? nouns[type].filter(startsWithConsonant) :
            id === 'an' ? nouns[type].filter(startsWithVowel) :
            nouns[type]
    }
}

const prepositions = [
    'of', 'in', 'to', 'for', 'with', 'on', 'at', 'from', 'by', 'about',
    'as', 'into', 'like', 'through', 'after', 'over', 'between', 'out',
    'against', 'during', 'without', 'before', 'under', 'around', 'among'
].map(value => ({id:value || 'continue', value}))

const adjectives = [
    'good', 'new', 'first', 'last', 'long', 'great', 'little', 'own', 'other',
    'old', 'right', 'big', 'high', 'different', 'small', 'large', 'next',
    'early', 'young', 'important', 'few', 'public', 'bad', 'same', 'able'
].map(value => ({id:value || 'continue', value}))

const NounPhrase: React.StatelessComponent<{
    id: string,
    children?: (type: Noun["type"]) => React.ReactNode
}> = ({id, children}) => (
    <Selector ids={[id+'.DET', id+'.ADJ', id+'.N', id+'.PP.P']} options={determiners} optionGetters={[
        det=>det && adjectives, getNounsFromDeterminer, (det, adj, noun)=> console.log('prep check', det, adj, noun) || noun && prepositions
    ]}>{(d, a, n: Noun, p: Option) =>
        n && (
            p ? <NounPhrase id={id+'.PP'}>{children}</NounPhrase> :children && children(n.type)
        )
    }</Selector>
)

const verbs = [
    { present: 'being', future: 'be', past: 'been' },
    { present: 'having', future: 'have', past: 'had' },
    { present: 'doing', future: 'do', past: 'done' },
    { present: 'saying', future: 'say', past: 'said' },
    { present: 'getting', future: 'get', past: 'got' },
    { present: 'making', future: 'make', past: 'made' },
    { present: 'going', future: 'go', past: 'gone' },
    { present: 'knowing', future: 'know', past: 'known' },
    { present: 'taking', future: 'take', past: 'taken' },
    { present: 'seeing', future: 'see', past: 'seen' },
    { present: 'coming', future: 'come', past: 'come' },
    { present: 'thinking', future: 'think', past: 'thought' },
    { present: 'looking', future: 'look', past: 'looked' },
    { present: 'wanting', future: 'want', past: 'wanted' },
    { present: 'giving', future: 'give', past: 'given' },
    { present: 'using', future: 'use', past: 'used' },
    { present: 'finding', future: 'find', past: 'found' },
    { present: 'telling', future: 'tell', past: 'told' },
    { present: 'asking', future: 'ask', past: 'asked' },
    { present: 'working', future: 'work', past: 'worked' },
    { present: 'seeming', future: 'seem', past: 'seemed' },
    { present: 'feeling', future: 'feel', past: 'felt' },
    { present: 'trying', future: 'try', past: 'tried' },
    { present: 'leaving', future: 'leave', past: 'left' },
    { present: 'calling', future: 'call', past: 'called' }
]
.reduce(({ past, present, future }, verb) => ({
    past: past.concat([{
        id: verb.future,
        value: verb.past,
    }]),
    present: present.concat([{
        id: verb.future,
        value: verb.present,
    }]),
    future: future.concat([{
        id: verb.future,
        value: verb.future,
    }]),
}), {
    past: [] as Option[],
    present: [] as Option[],
    future: [] as Option[],
})

const tenses = {
    s: [
        { id: 'present', value: 'is'},
        { id: 'future', value: 'will'},
        { id: 'past', value: 'has'},
    ],
    p: [
        { id: 'present', value: 'are'},
        { id: 'future', value: 'will'},
        { id: 'past', value: 'have'},
    ],
}

const getVerbsFromTense = (tense: Option) => tense && verbs[tense.id]

const VerbPhrase: React.StatelessComponent<{ id:string, type: Noun["type"] }> = ({id, type, children}) =>
<Selector
ids={[id+'.T', id+'.V']}
options={tenses[type]}
optionGetters={[
    getVerbsFromTense
]}>{(tense: { id: string }, verb) =>
    tense && verb && <NounPhrase id={id+'.NP'}>{() => children}</NounPhrase>
}</Selector>

const Poem: React.StatelessComponent<{ id:string, idx: number }> =({id, idx, children}) =>
    <NounPhrase id={`${id}.${idx}.NP`}>{type =>
        <VerbPhrase id={`${id}.${idx}.VP`} type={type}>
            <br />
            <Poem id={id} idx={idx+1}>
                {children}
            </Poem>
        </VerbPhrase>
    }</NounPhrase>

class Example extends React.Component {
    render() {
        return (
            <form style={{
                textAlign: 'center'
            }}>
                <Sentence choices={choices}>
                    <h1>
                        <NounPhrase id='title' />
                    </h1>
                    <p>
                        <Poem id='poem' idx={0}/>
                        <br />
                        <input type="submit" value="Save"/>
                    </p>
                </Sentence>
                <footer style={{
                    width: '100%',
                    height: '33%',
                    textAlign: 'center',
                    position: 'fixed',
                    bottom: 0,
                }}>
                    Make a poem with only the most common words
                </footer>
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
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}
const choices = parse(window.location.search.substr(1).split('&'));