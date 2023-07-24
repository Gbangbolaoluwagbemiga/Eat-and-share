const initialFriends = [
  {
    id: 2002,
    name: 'Bess',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 2000,
    name: 'Blossom',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 1998,
    name: 'celestina',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
  {
    id: 2001,
    name: 'Oluwagbemiga',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
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
  return (
    <div className="app">
      <div className="sidebar">
        <Eat />
      </div>
    </div>
  );
}

function Eat({selectedFriend, onSelection}) {
  return (
    <ul>
      {initialFriends.map(friend => (
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
          {friend.name} owes you {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button>{isSelected ? 'Close' : 'Select'}</Button>
    </li>
  );
}
