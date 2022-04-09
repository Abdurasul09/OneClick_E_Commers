// import Link from "next/link";
// import data from '../src/components/Header/Data'
//
// const Burger = ({active, setActive}) => {
//     return (
//         <div className={active ? "menu active" : "menu"} onClick={() => setActive(false)}>
//             <div className="menu__blur"/>
//             <div className="menu__content" onClick={e => e.stopPropagation()}>
//                 <ul>
//                     {data.map(item => (
//                         <li key={item.id} className='dropdown'>
//                             <Link href={`/post/${item.id}`}>
//                                 <a>{item.name}</a>
//                             </Link>
//                             <ul>
//                                 <li>
//                                     <div>
//                                         {item.desc.map(el => (
//                                             <div key={el.id}>
//                                                 <Link href="#">
//                                                     <a>{el}</a>
//                                                 </Link>
//                                             </div>
//                                         ))}
//                                     </div>
//                                     <img src={item.image} alt="image"/>
//                                 </li>
//                             </ul>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };
//
// export default Burger;