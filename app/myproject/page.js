const people = [
    {
      name: 'Leslie Alexander',
      donation: '$250',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
     
    },
    {
      name: 'Michael Foster',
      donation: '$250',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      
    },
    {
      name: 'Dries Vincent',
      donation: '$250',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      
    },
    /*{
      name: 'Lindsay Walton',
      donation: '$250',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      
    },
    {
      name: 'Courtney Henry',
      donation: '$250',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      
    },
    {
      name: 'Tom Cook',
      donation: '$250',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      
    },*/
  ]

function MyProject() {
    return(

        <section className=" flex lg:flex-row sm:flex-col md:flex-col justify-evenly pt-32">
            
              <div className="">
      <div>
        <p className="text-8xl">My Project</p>
      </div>

      <div>
        <img className="p-28" src="" alt="" />
      </div>

      <div className="pb-8">
        <p className="text-5xl">Build a cat shelter with us!</p>
      </div>

      <div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
          <div className="bg-green-600 h-2.5 rounded-full dark:bg-blue-500" style={{ width: 450 }}></div>
        </div>
      </div>

      <div className="flex justify-between">
        <p>Raised:</p>
        <p>Goal:</p>
      </div>

      <div className="flex justify-between text-5xl">
        <p>$2,500</p>
        <p>$3,500</p>
      </div>
              </div>

              <div className="">
      
        <div> 
          <button className="text-4xl hover:text-gray-800">Transaction History</button>
        </div>

        <div>
          <p>All Projects</p>
          <p>Sort</p>
        </div>

        <div>
          <ul className="">
            {people.map((person) => (
              <li className="flex justify-between gap-x-6 py-5" key={person.name}>
                <div className="flex gap-x-4">
                  <img className="h-12 w-12 flex-none rounded-lg bg-gray-50" src={person.imageUrl} alt="" />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                  </div>
                </div>
                <div className="flex gap-x-6">
                  <p className="text-sm leading-6 text-gray-900">{person.donation}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <button className="hover:text-gray-800 border border-gray-400 rounded justify-stretch">View More</button>
        </div>

        <div> <button className="text-4xl hover:text-gray-800">Statistics</button>
        </div>
              </div>
            
  
        </section>

    )
    
}

export default MyProject
