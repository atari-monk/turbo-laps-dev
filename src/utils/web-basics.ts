export async function loadJsonData<T>(filePath: string): Promise<T> {
    const response = await fetch(filePath);
    return response.json();
}

export function getElement<T extends HTMLElement>(elementId: string): T {
    return document.getElementById(elementId) as T;
}
