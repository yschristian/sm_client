import { useState } from "react";
import {
    Box,
    useTheme,
    useMediaQuery,
    TextField,
    Button,
    Typography
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import { boolean } from "yup/lib/locale";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
})

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
})

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    location: "",
    occupation: "",
    picture: "",
}

const initialValuesLogin = yup.object().shape({
    email: "",
    password: "",
})

export default form = () => {
    const [pageType, setPageType] = useState("login")
    const { palette } = useTheme()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const isNonMobileScreens = useMediaQuery("(min-width: 600px)")
    const isLogin = pageType === "login"
    const isRegister = pageType === "register"

    const handleFormSubmit = async (values, onSubmitProps) => { }

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {
                ({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0 ,1fr))"
                            sx={{
                                "&>div": {
                                    gridColumn: isNonMobile ? undefined : "span 4"
                                }
                            }}
                        >
                            {isRegister && (
                                <>
                                    <TextField
                                        label="first Name"
                                        onBlur={handleBlur}
                                        onChange={values.firstName}
                                        name="firstName"
                                        error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                        sx={{ gridAutoColumn: "span 2" }}
                                    />
                                    <TextField
                                        label="last Name"
                                        onBlur={handleBlur}
                                        onChange={values.firstName}
                                        name="lastName"
                                        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                        sx={{ gridAutoColumn: "span 2" }}
                                    />
                                    <TextField
                                        label="Location"
                                        onBlur={handleBlur}
                                        onChange={values.location}
                                        name="location"
                                        error={Boolean(touched.location) && Boolean(errors.location)}
                                        helperText={touched.location && errors.location}
                                        sx={{ gridAutoColumn: "span 4" }}
                                    />
                                    <TextField
                                        label="Occupation"
                                        onBlur={handleBlur}
                                        onChange={values.occupation}
                                        name="occupation"
                                        error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                        helperText={touched.occupation && errors.occupation}
                                        sx={{ gridAutoColumn: "span 4" }}
                                    />
                                    <Box
                                        gridColumn="span 4"
                                        border={`1px solid ${palette.neutral.medium}`}
                                        borderRadius="5px"
                                        p="1rem"

                                    >
                                        <Dropzone
                                            acceptedFiles=".jpg,.jpeg,.png"
                                            multiple={false}
                                            onDrop={(acceptedFiles) =>
                                                setFieldValue("picture", acceptedFiles[0])
                                            }
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <Box
                                                    {...getRootProps()}
                                                    border={`2px dashed ${palette, primary.main}`}
                                                    p="1rem"
                                                    sx={{
                                                        "&:hover": { cursor: "pointer" }
                                                    }}
                                                >
                                                    <input {...getInputProps()} />
                                                    {!values.picture ? (
                                                        <p>Add Picture Here</p>
                                                    ) : (
                                                        <FlexBetween>
                                                            <Typography>{values.picture.name}</Typography>
                                                            <EditOutlined />
                                                        </FlexBetween>
                                                    )}
                                                </Box>
                                            )}
                                        </Dropzone>
                                    </Box>
                                </>
                            )}
                            <TextField
                                label="Email"
                                onBlur={handleBlur}
                                onChange={values.email}
                                name="email"
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx={{ gridAutoColumn: "span 4" }}
                            />
                            <TextField
                                label="Password"
                                type="hidden"
                                onBlur={handleBlur}
                                onChange={values.password}
                                name="password"
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx={{ gridAutoColumn: "span 4" }}
                            />
                        </Box>
                        {/* BUTTONS */}
                        <Box>
                            <Button
                                fullWidth
                                type="submit"
                                sx={{
                                    m: "2rem 0",
                                    p: "1rem",
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt,
                                    "&:hover": { color: palette.primary.main }
                                }}
                            >
                                {isLogin ? LOGIN : REGISTER}
                            </Button>
                            <Typography
                                onClick={
                                    () => {
                                        setPageType(isLogin ? "register" : "login");
                                        resetForm();
                                    }
                                }
                                sx={
                                    {
                                        textDecoration: "underline",
                                        color: palette.primary.main,
                                        "&:hover": {
                                            cursor: "pointer",
                                            color: palette.primary.light
                                        }
                                    }
                                }
                            >
                                {
                                    isLogin
                                        ? "Don't have an account? Sign Up here."
                                        : "Already have an account? login here"
                                }
                            </Typography>
                        </Box>
                    </form>
                )
            }
        </Formik>
    )

}