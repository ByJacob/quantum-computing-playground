function Menu() {
  const MOCK_POSITIONS = [
    {
      id: "menu-1",
      name: "01. Lekcja 1"
    },
    {
      id: "menu-2",
      name: "02. Lekcja 2"
    },
    {
      id: "menu-3",
      name: "03. Lekcja 3"
    },
    {
      id: "menu-4",
      name: "04. Lekcja 4"
    },
    {
      id: "menu-5",
      name: "05. Lekcja 5"
    },
  ]
  const MOCK_CURRENT_ID = 'menu-1';

  const items = MOCK_POSITIONS.map((item: any) => {
    if (item.id === MOCK_CURRENT_ID) {
      return (
        <li className="pt-3 pb-3 pl-5 items-center border-s-8">
          <div className="flex">
            <a href="#" className="text-slate-100 hover:text-blue-300">
              {item.name}
            </a>
          </div>
        </li>
      )
    } else {
      return (
        <li className="pt-3 pb-3 pl-5 items-center">
          <div className="flex">
            <a href="#" className="text-slate-100 hover:text-blue-300">
              {item.name}
            </a>
          </div>
        </li>
      )
    }
    
  })

  return (
    <ul className="max-w-md divide-y divide-gray-200">
      {items}
    </ul>
  )
}

export default Menu