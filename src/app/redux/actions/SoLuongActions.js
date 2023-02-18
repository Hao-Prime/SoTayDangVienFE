import Services from 'app/services';

export const GET_SOLUONG_THONGBAO = 'GET_SOLUONG_THONGBAO';

export const getSoLuongThongBao = () => (dispatch) => {
  Services.getThongKeService().getTongSoLuongDashboard().then((res) => {
    dispatch({
      type: GET_SOLUONG_THONGBAO,
      payload: res.data,
    });
  });
};

