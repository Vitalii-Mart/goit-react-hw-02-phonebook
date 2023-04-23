import React, { Component } from 'react';
import shortid from 'shortid';
import { Section, Title } from './App.styled';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts.`);
    } else {
      const cont = {
        id: shortid.generate(),
        name,
        number,
      };
      this.setState(prevState => ({
        contacts: [cont, ...prevState.contacts],
      }));
    }
  };

  changeFiltar = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  getFilter = () => {
    const { filter, contacts } = this.state;
    const normalFiltar = filter.toLowerCase();

    return contacts.filter(cont =>
      cont.name.toLowerCase().includes(normalFiltar)
    );
  };
  onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };
  render() {
    const { filter } = this.state;
    const filterContacts = this.getFilter();
    return (
      <Section>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.addContact} />

        <Title>Contacts</Title>
        <Filter onChange={this.changeFiltar} value={filter} />
        <ContactList
          contacts={filterContacts}
          onDeleteContact={this.onDeleteContact}
        />
      </Section>
    );
  }
}

export default App;
