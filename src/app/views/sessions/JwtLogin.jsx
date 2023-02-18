import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import Services from 'app/services';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import logo from "../../assets/images/Logo-Tinh-Long-An.png"
const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100% !important',
    '& .card': {
        maxWidth: 800,
        minHeight: 400,
        margin: '1rem',
        display: 'flex',
        borderRadius: 12,
        alignItems: 'center',
    },
}));

// inital login credentials
const initialValues = {
    email: '',
    password: '',
    remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Password phải ít nhất 8 ký tự')
        .required('Cần nhập password'),
    email: Yup.string().required('Cần nhập Email/SDT'),
});

const JwtLogin = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleFormSubmit = async (values) => {
        setLoading(true);

        Services.getTaiKhoanService().dangNhap(values.email, values.password).then(
            (response) => {
                if (response.data.tenLoi == undefined) {

                    login(response.data.access_token, response.data)
                    navigate('/');



                } else {
                    setLoading(false);
                    setError(response.data.noiDung)
                }
            },
            (error) => {
                setLoading(false);
                setError("Không kết nối được với Server")

            }
        )

    };
    return (
        <JWTRoot>
            <Card className="card form-login">
                <Grid container>
                    <Grid item sm={6} xs={12}>
                        <JustifyBox p={4} height="100%" sx={{ minWidth: 250, paddingBottom: 0, paddingTop: "20px", height: "unset" }}>
                            <img src={logo} width="100%" alt="" />

                        </JustifyBox>
                        <JustifyBox >
                            <Paragraph className={"text-logo"}>PHẦN MỀM QUẢN LÝ HỒ SƠ ĐẢNG VỤ
                                ĐẢNG BỘ VIỄN THÔNG LONG AN</Paragraph>
                        </JustifyBox>

                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <ContentBox>
                            <Formik
                                onSubmit={handleFormSubmit}

                                initialValues={initialValues}
                                validationSchema={validationSchema}
                            >
                                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="text"
                                            name="email"
                                            label="Email/Số điện thoại"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.email}
                                            onChange={handleChange}
                                            onInput={() => setError("")}
                                            helperText={touched.email && errors.email}
                                            error={Boolean(errors.email && touched.email)}
                                            sx={{ mb: 3 }}
                                        />

                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="password"
                                            type="password"
                                            label="Password"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.password}
                                            onChange={handleChange}
                                            onInput={() => setError("")}
                                            helperText={touched.password && errors.password}
                                            error={Boolean(errors.password && touched.password)}
                                            sx={{ mb: 1.5 }}
                                        />

                                        <FlexBox justifyContent="space-between">
                                            <FlexBox gap={1}>
                                                <Checkbox
                                                    size="small"
                                                    name="remember"
                                                    onChange={handleChange}
                                                    checked={values.remember}
                                                    sx={{ padding: 0 }}
                                                />

                                                <Paragraph>Lưu tài khoản</Paragraph>
                                            </FlexBox>

                                            <NavLink
                                                to="#"
                                                style={{ color: theme.palette.primary.main }}
                                            >
                                                Quên mật khẩu?
                                            </NavLink>
                                        </FlexBox>
                                        {error != "" && <Paragraph className="text-error" ><i>{error}</i></Paragraph>}
                                        <LoadingButton
                                            type="submit"
                                            color="primary"
                                            loading={loading}
                                            variant="contained"
                                            sx={{ my: 2 }}
                                        >
                                            Đăng nhập
                                        </LoadingButton>

                                        <Paragraph>
                                            Chưa có tài khoản
                                            <NavLink
                                                to="/#"
                                                style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                                            >
                                                Liên hệ
                                            </NavLink>
                                        </Paragraph>
                                    </form>
                                )}
                            </Formik>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </JWTRoot>
    );
};

export default JwtLogin;
