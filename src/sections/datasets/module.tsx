import {ModuleExports} from "datasets/index";

const modules = import.meta.glob<ModuleExports>("./**/**/ui/*.tsx");
console.log(modules)
const getDatasetModule = async (name?:string) => {

    const moduleExports: Record<string, any> = {};

    Object.entries(modules).forEach(([path, mod]) => {
        moduleExports[path.split('/')[2]] = mod;
    });
    if (name) {
        const mod = await moduleExports["datasetsPage"]();
        // console.log(mod.default);
        return mod.default;
    }
    else return <div>xyi</div>;
}

export default getDatasetModule;