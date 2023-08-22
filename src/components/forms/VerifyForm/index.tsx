"use client";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NextLink from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import authApi from "@/apis/auth.api";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  otp: yup
    .string()
    .min(4, "OTP should be have 4 characters")
    .required("OTP is required"),
});

export default function VerifyOTPForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await authApi.verifyOTP({
          ...values,
          email: searchParams.get("email") as string,
        });
        toast.success("Verify successful please login.");
        router.push("/login");
      } catch (error) {
        toast.error((error as Error).message);
      }
    },
  });

  const sendOTP = () => {
    authApi.sendOTP({ email: searchParams.get("email")! });
    toast.success("Your OTP have been sent, please check your email!");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1 }} className="bg-blue-500">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Verify OTP
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Please enter the verification code sent to your email.
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 3 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="otp"
            label="Verification Code"
            name="otp"
            autoComplete="off"
            autoFocus
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={formik.touched.otp && formik.errors.otp}
          />
          <Button
            type="submit"
            fullWidth
            className="bg-blue-600"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Verify
          </Button>
          <Button variant="text" onClick={sendOTP}>
            Send OTP
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={NextLink} href="/login" variant="body2">
                Back to Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
