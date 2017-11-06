import * as React from 'react';
import { Sentence, Option, Selection, Word, List, Phrase } from '../src/index'

const wordToOption = (x:string) => ({ id:x, value:x }) as Option

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
        type: 'p' as 'p',
        value: np
    }]),
    b: b.concat([{
        id: ns,
        type: 's' as 's',
        value: ns
    }, {
        id: np,
        type: 'p' as 'p',
        value: np
    }])
}), {
    s: [] as Noun[],
    p: [] as Noun[],
    b: [] as Noun[],
})

const startsWithVowel = (x: Noun) => 'aeiou'.indexOf(x.value[0]) >= 0
const startsWithConsonant = (x: Noun) => 'aeiou'.indexOf(x.value[0]) === -1

interface Determiner extends Option { type: 's'|'p'|'b' }
const determiners = [
    { id: 'the', type: 'b' },
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
})) as Determiner[]

const prepositions = [
    'of', 'in', 'to', 'for', 'with', 'on', 'at', 'from', 'by', 'about',
    'as', 'into', 'like', 'through', 'after', 'over', 'between', 'out',
    'against', 'during', 'without', 'before', 'under', 'around', 'among'
].map(value => ({id:value || 'continue', value}) as Option)

const adjectives = [
    'good', 'new', 'first', 'last', 'long', 'great', 'little', 'own', 'other',
    'old', 'right', 'big', 'high', 'different', 'small', 'large', 'next',
    'early', 'young', 'important', 'few', 'public', 'bad', 'same', 'able'
].map(value => ({id:value || 'continue', value}) as Option)


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

interface NounPhraseSelections {
    [x: string]: Selection
    det: Determiner
    adj: Option[]
    noun: Noun
    PP: {
        prep: Option
        NP: NounPhraseSelections
    }
}

const NounPhrase = () => <span>
<Word id='det' getOptions={() => determiners} />
<List id='adj'>{({noun, adj}: NounPhraseSelections, idx) =>
    noun && <Word key={idx} id={idx} getOptions={() => adjectives}/>
}</List>
<Word id='noun' getOptions={({ det }: NounPhraseSelections) =>
    det && (
        det.id === 'a' ? nouns[det.type].filter(startsWithConsonant) :
        det.id === 'an' ? nouns[det.type].filter(startsWithVowel) :
        nouns[det.type]
    ) }/>
<Phrase id='PP'>{({ noun }: NounPhraseSelections) => noun &&
    <span>
        <Word id='prep' getOptions={() => prepositions}/>
        <Phrase id='NP'>{({ prep }: NounPhraseSelections['PP']) => prep && <NounPhrase/>}</Phrase>
    </span>
}</Phrase>
</span>

interface VerbPhraseSelections extends NounPhraseSelections {
    tense: Option,
    verb: Option,
}
const VerbPhrase = () => <span>
    <Word id='tense' getOptions={({ noun }) => noun && tenses[noun.type] }/>
    <Word id='verb' required getOptions={({ noun, tense }) => noun && tense && verbs[tense.id]}/>
    <Phrase id='NP'>{({ verb }: VerbPhraseSelections) => verb && <NounPhrase/>}</Phrase>
</span>

class Poem extends React.Component {
    render() {
        return (
            <form style={{
                textAlign: 'center'
            }}>
                <h1>
                    <Sentence id='title' choices={choices}>
                        <NounPhrase />
                        <VerbPhrase />
                    </Sentence>
                </h1>
                <p>
                    <Sentence id='poem' choices={choices}>
                        <List id='line'>{({ line }, idx) =>
                            (idx === 0 || (line[idx-1] && line[idx-1].noun)) &&
                            <Phrase key={idx} id={idx}>{({ }) => <span>
                                <NounPhrase /> <VerbPhrase />,<br/>
                            </span>}</Phrase>
                        }</List>
                    </Sentence>
                    <input type="submit" value="Save"/>
                </p>
                <footer style={{
                    width: '100%',
                    height: '33%',
                    textAlign: 'center',
                    position: 'fixed',
                    bottom: 0,
                }}>
                    Make a poem with only the most common words in the english language
                </footer>
            </form>
        )
    }
}

export default Poem;

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