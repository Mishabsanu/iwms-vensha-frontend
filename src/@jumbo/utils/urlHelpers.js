/**
 * Check if the given url can be found
 * in one of the given parent's children
 *
 * @param parent
 * @param url
 * @returns {boolean}
 */
export const isUrlInChildren = (parent, url) => {
    
    if (!parent.children) {
        return false;
    }
    
    for (let i = 0; i < parent.children.length; i++) {
        if (parent.children[i].children) {
            if (isUrlInChildren(parent.children[i], url)) {
                return true;
            }
        }

        if (parent.children[i].uri === url || url.includes(parent.children[i].uri) || (parent.children[i]?.isActiveUri && parent.children[i].isActiveUri?.some((e) => {
            const regex = new RegExp('^' + e.replace(/:[^\s/]+/g, '([\\w-]+)').replace(/\//g, '\\/') + '$');
            return regex.test(url)
        }))) {
            return true;
        }
    }
    return false;
};