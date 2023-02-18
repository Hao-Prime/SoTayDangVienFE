import React from "react";


function checkUrl(url, listQuyen, roleUser) {
    if (listQuyen.includes(url) || roleUser.includes("ROLE_ADMIN")) {
        return true
    } else return false
}
function check2Url(url1, url2, listQuyen, roleUser) {
    if (listQuyen.includes(url1) || listQuyen.includes(url2) || roleUser.includes("ROLE_ADMIN")) {
        return true
    } else return false
}
export default {
    checkUrl,
    check2Url
};