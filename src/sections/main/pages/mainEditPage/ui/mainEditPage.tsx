import React from "react";
import {Modal} from 'common/shared/modal';
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { updateObject } from "common/entities/systemObject/model/store/objectActions";
// import { RootState } from "app/model/reducers";
// import s from './mainEditPage.module.scss';

export const MainEditPage: React.FC = () => {
    // const { objectId } = useParams<{ objectId: string }>(); // Извлечение objectId из URL
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    //
    // // Преобразование objectId в число, если это необходимо
    // const numericObjectId = parseInt(objectId || "0", 10);
    //
    // const object = useSelector((state: RootState) => state.objects.allObjects.find(obj => obj.ObjectId === numericObjectId));
    //
    // const [inputText, setInputText] = useState(object?.ObjectName || "");
    //
    // // Обновляем inputText, если объект изменился
    // useEffect(() => {
    //     if (object) {
    //         setInputText(object.ObjectName);
    //     }
    // }, [object]);
    //
    // const handleSave = () => {
    //     if (object) {
    //         const updatedObject = { ...object, ObjectName: inputText };
    //         dispatch(updateObject(updatedObject));
    //     }
    //     navigate('/main');
    // };

    return (
        <Modal
            headerText={"Переименование"}
            component={
                <>
                    {/*<div className={s.main__content}>*/}
                    {/*    <div className={s.input__container}>*/}
                    {/*        <input*/}
                    {/*            className={s.input__area}*/}
                    {/*            type="text"*/}
                    {/*            value={inputText}*/}
                    {/*            onChange={(e) => setInputText(e.target.value)}*/}
                    {/*            placeholder="Введите новое имя..."*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<hr style={{ margin: "0" }} />*/}
                    {/*<div className={s.main__content} style={{ paddingTop: "0" }}>*/}
                    {/*    <div className={s.button__container}>*/}
                    {/*        <button className={s.button} onClick={handleSave}>*/}
                    {/*            <span className={s.button__text}>Сохранить</span>*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </>
            }
            handleClose={() => navigate('/main')}
        />
    )
}

export default MainEditPage;