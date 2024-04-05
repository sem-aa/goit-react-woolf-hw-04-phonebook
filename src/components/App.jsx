import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import Container from './Container/Container';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const [contacts, setContacts] = useState(() =>
    JSON.parse(localStorage.getItem('contacts') ?? initialContacts)
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    if (
      contacts.find(
        item =>
          item.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()
      )
    ) {
      return alert(`${contact.name} contact already exists `);
    }
    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const filterChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const onDeleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  const filteredContacts = getFilteredContacts();

  return (
    <Container>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter onChange={filterChange} />
      <ContactList
        filteredContacts={filteredContacts}
        onDeleteContact={onDeleteContact}
      />
    </Container>
  );
};

export default App;
