import { LoadingOverlay } from "@mantine/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.clear()
        navigate('/auth/login')
    }, [])
    return (
        <LoadingOverlay visible={true} />
    )
}