
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function initInterceptor() {
    // Lỗi 401 và 403
    axios.interceptors.response.use(
        (res) => {
            if ([201, 203, 204, 202].includes(res.status)) {

                toast.success('Thao tác thành công', {
                    position: "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            }
            return res;
        },
        (error) => {
            console.log(error);
            if (400 === error?.response?.status) {
                if ((axios.defaults.headers.common['Authorization']) != undefined) {
                    toast.error('Đã có lỗi xẩy ra', {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }


            } else if (404 === error?.response?.status) {
                if ((axios.defaults.headers.common['Authorization']) != undefined) {
                    toast.error('Không tìm thấy url request', {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }


            } else if (401 === error?.response?.status) {

                // alert("Lỗi xác thực, cần đăng nhập lại");
                window.location = "/session/signin"
                localStorage.removeItem('access_token')
                delete axios.defaults.headers.common.Authorization
            } else if (403 === error?.response?.status) {

                // toast.warn('Bạn không có quyên truy cập', {
                //     position: "top-right",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     });
                alert("Bạn không có quyền truy cập")
                window.location = "/"
                return Promise.reject(error);
            } else if (413 === error?.response?.status) {

                toast.error('Tổng file cần lưu không được quá 10MB', {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                // alert("Không thành công");
                return Promise.reject(error);
            }
        }
    );
}


const interceptorService = {
    initInterceptor
};
export default interceptorService