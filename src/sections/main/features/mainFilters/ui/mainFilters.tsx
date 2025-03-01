// import React from 'react';
// import s from './mainFilters.module.scss';
// import Form from 'react-bootstrap/Form';
// import { Dropdown } from 'react-bootstrap';
// import sortIcon from '../lib/sortIcon.svg';
// import closeIcon from '../lib/closeIcon.svg';
// import dashboardIcon from '../lib/dashboardIcon.svg'
// import folderIcon from '../lib/folderIcon.svg'
// import searchIcon from '../lib/searchIconGray24.svg';
// import { APPLY_FILTERS } from 'common/entities/systemObject/model/store/actionTypes';
// import { CardInfoType } from '../../../widgets/mainObjectCards/lib/types'

const MainFiltersComponent = () => {
    // const [sortedBy, setSortedBy] = useState<string>('new-first');
    // const [objectType, setObjectType] = useState<string>('');
    // const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
    // const [dateRange, setDateRange] = useState<string>('');
    // const [inputText, setInputText] = useState<string>('');
    // // const dispatch = useDispatch();
    //
    // const generateRandomColor = () => {
    //     const letters = '0123456789ABCDEF';
    //     let color = '#';
    //     for (let i = 0; i < 6; i++) {
    //         color += letters[Math.floor(Math.random() * 16)];
    //     }
    //     return color;
    // };
    //
    // // const allObjects = useSelector((state: RootState) => state.objects.allObjects);
    //
    // const owners = useMemo(() => {
    //     const uniqueOwners = allObjects.reduce<{
    //         [key: string]: { name: string; email: string; color: string };
    //     }>((acc, object) => {
    //         if (!acc[object.ownerEmail]) {
    //             acc[object.ownerEmail] = {
    //                 name: object.ownerName,
    //                 email: object.ownerEmail,
    //                 color: generateRandomColor(),
    //             };
    //         }
    //         return acc;
    //     }, {});
    //
    //     return Object.values(uniqueOwners);
    // }, [allObjects]);
    //
    // const handleOwnerChange = (email: string) => {
    //     setSelectedOwners(prev =>
    //         prev.includes(email)
    //             ? prev.filter(item => item !== email)
    //             : [...prev, email]
    //     );
    // };
    //
    // const filteredOwners = owners.filter((owner) =>
    //     owner.name.toLowerCase().includes(inputText.toLowerCase())
    // );
    //
    // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setInputText(event.target.value);
    // };
    //
    // useEffect(() => {
    //     applyFilters();
    // }, [selectedOwners, sortedBy, objectType, dateRange]);
    //
    // const applyFilters = () => {
    //     dispatch({
    //         type: APPLY_FILTERS,
    //         payload: { sortedBy, objectType, selectedOwners, dateRange }
    //     });
    // };
    //
    // const clearFilters = () => {
    //     setSortedBy('new-first');
    //     setObjectType('');
    //     setSelectedOwners([]);
    //     setDateRange('');
    // };
    //
    // const sortedByObj: { [key: string]: string } = {
    //     'alphabetically': 'Алфавиту A → Я',
    //     'non-alphabetically': 'Алфавиту Я → А',
    //     'new-first': 'Сначала новые',
    //     'old-first': 'Сначала старые',
    // };
    //
    // const sortedByObject: { [key: string]: string } = {
    //     'folder': 'Папка',
    //     'dashboard': 'Дашборд',
    // };
    //
    // interface RootState {
    //     objects: {
    //         allObjects: CardInfoType[];
    //         filteredObjects: CardInfoType[];
    //     };
    // }
    //
    //
    //
    //
    // const getInitials = (name: string) => {
    //     const parts = name.split(' ');
    //     const initials = parts.map(part => part[0]).join('');
    //     return initials.toUpperCase();
    // };
    //
    // return (
    //     <div className={s.container}>
    //         <Dropdown autoClose="outside">
    //             <Dropdown.Toggle className={s.owner__dropdown} id="dropdown-basic">
    //                 <img alt="sort" src={sortIcon} />
    //                 {sortedByObj[sortedBy]}
    //             </Dropdown.Toggle>
    //
    //             <Dropdown.Menu>
    //                 <Form.Check
    //                     checked={sortedBy === 'alphabetically'}
    //                     onChange={() => setSortedBy('alphabetically')}
    //                     type="radio"
    //                     id="alphabetically"
    //                     label="Алфавиту A → Я"
    //                 />
    //                 <Form.Check
    //                     checked={sortedBy === 'non-alphabetically'}
    //                     onChange={() => setSortedBy('non-alphabetically')}
    //                     type="radio"
    //                     id="non-alphabetically"
    //                     label="Алфавиту Я → А"
    //                 />
    //                 <hr />
    //                 <Form.Check
    //                     checked={sortedBy === 'new-first'}
    //                     onChange={() => setSortedBy('new-first')}
    //                     type="radio"
    //                     id="new-first"
    //                     label="Сначала новые"
    //                 />
    //                 <Form.Check
    //                     checked={sortedBy === 'old-first'}
    //                     onChange={() => setSortedBy('old-first')}
    //                     type="radio"
    //                     id="old-first"
    //                     label="Сначала старые"
    //                 />
    //             </Dropdown.Menu>
    //         </Dropdown>
    //
    //         <Dropdown autoClose="outside">
    //             <Dropdown.Toggle className={s.owner__dropdown} id="dropdown-basic">
    //                 {sortedByObject[objectType] || 'Тип объекта'}
    //             </Dropdown.Toggle>
    //
    //             <Dropdown.Menu>
    //                 <Dropdown.Item href="#/action-1" onClick={() => setObjectType('folder')}>
    //                     <div className={s.dropdown__row}>
    //                         <img alt='icon' src={folderIcon} />
    //                         <span className={s.dropdown__text}>Папка</span>
    //                     </div>
    //                 </Dropdown.Item>
    //                 <Dropdown.Item href="#/action-2" onClick={() => setObjectType('dashboard')}>
    //                     <div className={s.dropdown__row}>
    //                         <img alt='icon' src={dashboardIcon} />
    //                         <span className={s.dropdown__text}>Дашборд</span>
    //                     </div>
    //                 </Dropdown.Item>
    //             </Dropdown.Menu>
    //         </Dropdown>
    //
    //         <Dropdown autoClose="outside">
    //             <Dropdown.Toggle className={s.owner__dropdown} id="dropdown-owner">
    //                 Владелец ({selectedOwners.length})
    //             </Dropdown.Toggle>
    //
    //             <Dropdown.Menu>
    //                 <div className={s.input__container}>
    //                     <img alt="search" src={searchIcon} />
    //                     <input
    //                         className={s.input__area}
    //                         type="text"
    //                         value={inputText}
    //                         placeholder="Поиск..."
    //                         onChange={handleSearchChange}
    //                     />
    //                 </div>
    //                 {filteredOwners.map(owner => (
    //                     <Form.Check
    //                         className={s.form_check}
    //                         key={owner.email}
    //                         checked={selectedOwners.includes(owner.email)}
    //                         onChange={() => handleOwnerChange(owner.email)}
    //                         type="checkbox"
    //                         id={owner.email}
    //                         label={
    //                             <div className={s.ownerLabel}>
    //                                 <div
    //                                     className={s.ownerIcon}
    //                                     style={{ backgroundColor: owner.color }}
    //                                 >
    //                                     <span className={s.owner__initials}>{getInitials(owner.name)}</span>
    //                                 </div>
    //                                 <div className={s.ownerText}>
    //                                     <div className={s.owner__name}>{owner.name}</div>
    //                                     <div className={s.owner__email}>{owner.email}</div>
    //                                 </div>
    //                             </div>
    //                         }
    //                     />
    //                 ))}
    //             </Dropdown.Menu>
    //         </Dropdown>
    //
    //         <Dropdown autoClose="outside">
    //             <Dropdown.Toggle className={s.owner__dropdown} id="dropdown-basic">
    //                 Дата изменения
    //             </Dropdown.Toggle>
    //
    //             <Dropdown.Menu>
    //                 <Form.Check
    //                     checked={dateRange === 'today'}
    //                     onChange={() => setDateRange('today')}
    //                     type="radio"
    //                     id="today"
    //                     label="Сегодня"
    //                 />
    //                 <Form.Check
    //                     checked={dateRange === 'last-7-days'}
    //                     onChange={() => setDateRange('last-7-days')}
    //                     type="radio"
    //                     id="last-7-days"
    //                     label="За последние 7 дней"
    //                 />
    //                 <Form.Check
    //                     checked={dateRange === 'last-30-days'}
    //                     onChange={() => setDateRange('last-30-days')}
    //                     type="radio"
    //                     id="last-30-days"
    //                     label="За последние 30 дней"
    //                 />
    //                 <Form.Check
    //                     checked={dateRange === 'this-year'}
    //                     onChange={() => setDateRange('this-year')}
    //                     type="radio"
    //                     id="this-year"
    //                     label="За этот год (2024)"
    //                 />
    //                 <Form.Check
    //                     checked={dateRange === 'last-year'}
    //                     onChange={() => setDateRange('last-year')}
    //                     type="radio"
    //                     id="last-year"
    //                     label="За прошлый год (2023)"
    //                 />
    //                 <Form.Check
    //                     checked={dateRange === 'custom'}
    //                     onChange={() => setDateRange('custom')}
    //                     type="radio"
    //                     id="custom"
    //                     label="Собственный диапазон дат"
    //                 />
    //             </Dropdown.Menu>
    //         </Dropdown>
    //
    //         <div className={s.button__area} onClick={clearFilters}>
    //             <img alt="close button" src={closeIcon} />
    //         </div>
    //     </div>
    // );
};

export const MainFilters = MainFiltersComponent;
