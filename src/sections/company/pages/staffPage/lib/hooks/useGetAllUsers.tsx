import {useStore} from "common/shared/tools/incrumStore/store";
import {staffStore} from "common/entities/staff/model";
import {useEffect} from "react";
import {userAPI} from "common/entities/user/api";

export const useGetAllUsers = () => {
    const [store] = useStore(staffStore);
    useEffect(() => {
        userAPI.getAllUsers().then(res => {
            res.data ? store.staff = res.data : null;
            console.log(res)
        })
    }, [store])
}
