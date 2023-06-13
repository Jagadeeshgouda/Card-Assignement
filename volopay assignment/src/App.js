import React, { useState } from 'react';
import './App.css';

const App = () => {
  const data = [
    {
      name: 'Mixmax',
      budget_name: 'Software subscription',
      owner_id: 1,
      spent: {
        value: 100,
        currency: 'SGD',
      },
      available_to_spend: {
        value: 1000,
        currency: 'SGD',
      },
      card_type: 'burner',
      expiry: '9 Feb',
      limit: 100,
      status: 'active',
    },
    {
      name: 'Quickbooks',
      budget_name: 'Software subscription',
      owner_id: 2,
      spent: {
        value: 50,
        currency: 'SGD',
      },
      available_to_spend: {
        value: 250,
        currency: 'SGD',
      },
      card_type: 'subscription',
      limit: 10,
      status: 'active',
    },
  ];

  const [activeTab, setActiveTab] = useState('your');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const getVisibleCards = () => {
    let visibleCards = [];
    if (activeTab === 'your') {
      visibleCards = data.filter((card) => card.owner_id === 1); // Replace '1' with the actual owner_id
    } else if (activeTab === 'all') {
      visibleCards = data.filter((card) => card.status !== 'blocked');
    } else if (activeTab === 'blocked') {
      visibleCards = data.filter((card) => card.status === 'blocked');
    }

    if (searchTerm.trim() !== '') {
      const searchResults = visibleCards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return searchResults;
    }

    return visibleCards;
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <h1>CARDS PAGE</h1>
        </div>
        <div className="navbar-right">
          <img src="logo.png" alt="Logo" className="logo" />
          <span className="user-name">Unknown User</span>
        </div>
      </nav>
      <div className="tabs">
        <button
          className={activeTab === 'your' ? 'active' : ''}
          onClick={() => handleTabChange('your')}
        >
          Your Cards
        </button>
        <button
          className={activeTab === 'all' ? 'active' : ''}
          onClick={() => handleTabChange('all')}
        >
          TOTAL Cards
        </button>
        <button
          className={activeTab === 'blocked' ? 'active' : ''}
          onClick={() => handleTabChange('blocked')}
        >
          Blocked Cards
        </button>
      </div>
      <input type="text" className="search-bar" placeholder="Search by card name" value={searchTerm} onChange={handleSearch} />
      <div className="card-list">
        {getVisibleCards().map((card) => (
          <div className="card" key={card.name}>
            <div className="card-type">
              {card.card_type === 'burner' && (
                <div className='type-1'>{card.card_type}</div>
              )}
              {card.card_type === 'subscription' && (
                <div className='type-2'>{card.card_type}</div>
              )}
            </div>
            <h3 style={{ fontWeight: 800 }}>{card.name}</h3>
            <p>Budget Name: {card.budget_name}</p>
            <p>Owner ID: {card.owner_id}</p>
            <p>Spent: {card.spent.value} {card.spent.currency}</p>
            <p>Available to Spend: {card.available_to_spend.value} {card.available_to_spend.currency}</p>
            {card.card_type === 'burner' && (
              <p>Expiry: {card.expiry}</p>
            )}
            {card.card_type === 'subscription' && (
              <p>Limit: {card.limit}</p>
            )}
            <p>Status: {card.status}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
