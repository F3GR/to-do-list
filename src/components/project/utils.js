export const menuActions = (actionValue) => {
  const actions = {
    'add-new': addNew,
    'edit': edit,
    'remove': remove
  };

  const actionFunction = actions[actionValue];
  if (!(typeof actionFunction === 'function')) {
      alert(`Error: menu action ${actionValue} doesn\'t exist`);
      return false;
  }
  
  return (target) => actionFunction(target);
};

