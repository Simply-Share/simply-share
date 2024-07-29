import { fileToBase64 } from "./encodeFile";

export const saveToLocalStorage = async (projectName: string, file: any, fileType:string) => {
    localStorage.setItem('file', file);
    localStorage.setItem('fileType', fileType);
    localStorage.setItem('projectName', projectName);
}

export const getFromLocalStorage = () => {
    const projectName = localStorage.getItem("projectName");
    const file = localStorage.getItem("file");
    const fileType = localStorage.getItem("fileType");

    return { projectName, file, fileType };
}

export const deleteFromLocalStorage = () => {}