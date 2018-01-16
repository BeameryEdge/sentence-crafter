import * as React from 'react';
import ReportSelector, { Table, Field, MultiChoiceField, NumberField, DateField, BooleanField, NestedField } from '../src/ReportSelector'

const companyList = [new Field('c1', 'Company 1')]
const companyIdField = new MultiChoiceField('companyId', 'Company', companyList)

const users = new Table('users', 'Users', [
    companyIdField,
    new NumberField('friends', 'Number of Friends'),
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

const charts = [{
    id: 'count',
    value: 'Count',
    tables: [ users, companies, contacts, activities ]
}]

class Example extends React.Component {
    render() {
        return (
            <form style={{
                textAlign: 'center'
            }}>
            <ReportSelector charts={charts} choices={choices}/>
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
