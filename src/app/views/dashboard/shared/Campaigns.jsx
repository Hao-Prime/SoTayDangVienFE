import { Box } from '@mui/material';
import { MatxProgressBar, SimpleCard } from 'app/components';
import { Small } from 'app/components/Typography';
import Services from 'app/services';
import { useEffect, useState } from 'react';

const Campaigns = () => {
    const [data, setData] = useState()
    var isMounted = true;
    useEffect(() => {
        isMounted = true;
        Services.getThongKeService().getSoLuongChiTiet().then(
            (response) => {
                if (response.data != null) {
                    setData(response.data)
                }

            }
        );
        return () => { isMounted = false; };
    }, []);
    return (
        <Box>


            <SimpleCard title="Campaigns">
                <Small color="text.secondary">Trình độ</Small>
                <MatxProgressBar value={data?.soLuongDVSoCap * 100 / data?.soLuongDangVien} color="primary" text={"Sơ cấp (" + data?.soLuongDVSoCap + ")"} />
                <MatxProgressBar value={data?.soLuongDVTrungCap * 100 / data?.soLuongDangVien} color="secondary" text={"Trung cấp (" + data?.soLuongDVTrungCap + ")"} />
                <MatxProgressBar value={data?.soLuongDVCaoCap * 100 / data?.soLuongDangVien} color="danger" text={"Cao cấp (" + data?.soLuongDVCaoCap + ")"} />

                <Small color="text.secondary" display="block" pt={2}>
                    Độ tuổi
                </Small>
                <MatxProgressBar value={data?.soLuongDoTuoi1 * 100 / data?.soLuongDangVien} color="info" text={"18 đến 30 (" + data?.soLuongDoTuoi1 + ")"} />
                <MatxProgressBar value={data?.soLuongDoTuoi2 * 100 / data?.soLuongDangVien} color="primary" text={"31 đến 40 (" + data?.soLuongDoTuoi2 + ")"} />
                <MatxProgressBar value={data?.soLuongDoTuoi3 * 100 / data?.soLuongDangVien} color="secondary" text={"41 đến 50 (" + data?.soLuongDoTuoi3 + ")"} />
                <MatxProgressBar value={data?.soLuongDoTuoi4 * 100 / data?.soLuongDangVien} color="danger" text={"Trên 51 (" + data?.soLuongDoTuoi4 + ")"} />
                <Small color="text.secondary" display="block" pt={2}>
                    Giới tính
                </Small>
                <MatxProgressBar value={data?.soLuongNam * 100 / data?.soLuongDangVien} color="primary" text={"Nam (" + data?.soLuongNam + ")"} />
                <MatxProgressBar value={data?.soLuongNu * 100 / data?.soLuongDangVien} color="danger" text={"Nữ (" + data?.soLuongNu + ")"} />
                <div className='box-tk-db'>
                </div>
            </SimpleCard>

        </Box>
    );
};

export default Campaigns;
