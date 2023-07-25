import {useState} from 'react';

const initialFriends = [
  {
    id: 2002,
    name: 'Bess',
    image: 'img/Bess.jpg',
    balance: -7,
  },
  {
    id: 1993,
    name: 'Adetutu',
    image: 'img/22.jpg',
    balance: 60,
  },
  {
    id: 1998,
    name: 'Celestina',
    image: 'img/Tiny.jpg',
    balance: 0,
  },
  {
    id: 2001,
    name: 'Oluwagbemiga',
    image: 'img/GOPAE.jpeg',
    balance: 60,
  },
];

function Button({children, onClick}) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [display, setDisplay] = useState(false);

  function handlefriends(newfriend) {
    setFriends(prevFriends => [...prevFriends, newfriend]);
  }

  function handleDisplay() {
    setDisplay(prev => !prev);
  }
  function removeItems() {
    setDisplay(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <Eat selectedFriend={friends} onSelection={handlefriends} />
        {display && (
          <AddFriends onSelection={handlefriends} removeItems={removeItems} />
        )}{' '}
        <Button onClick={handleDisplay}>
          {!display ? 'Add Friend' : 'close'}
        </Button>
      </div>
      <ShareBill />
    </div>
  );
}

function Eat({selectedFriend, onSelection}) {
  return (
    <ul>
      {selectedFriend.map(friend => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

function Friend({friend, selectedFriend}) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {' '}
          {friend.name} owes you {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button>{isSelected ? 'Close' : 'Select'}</Button>
    </li>
  );
}

function AddFriends({onSelection, removeItems}) {
  const [name, setName] = useState('');
  const [img, setImg] = useState('https://i.pravatar.cc/48');

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !img) return;
    const id = crypto.randomUUID();
    const newfriend = {
      id,
      name,
      image: `${img}?=${id}`,
      balance: 0,
    };
    onSelection(newfriend);
    setName('');
    setImg('https://i.pravatar.cc/48');
    removeItems();
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />

      <label>🌄 Image URL</label>
      <input type="text" value={img} onChange={e => setImg(e.target.value)} />

      <Button>Add</Button>
    </form>
  );
}

function ShareBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💰 Bill value</label>
      <input type="text" />

      <label>🧍‍♀️ Your expense</label>
      <input type="text" />

      <label>👫Your expense</label>
      <input type="text" disabled />

      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">His/Her</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
