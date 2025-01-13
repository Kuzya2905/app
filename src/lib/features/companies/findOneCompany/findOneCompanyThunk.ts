import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { axiosBackend } from "@/lib/features/axiosWrapper";

import { FoundCompany } from "./findOneCompany.types";
import { ApiEndpointsCompanies } from "@/lib/features/types";


