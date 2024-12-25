export const host = "http://localhost:5000"

export const getAllCategoriesRoute =  ` ${host}/api/categories/getcategories`

export const getAllDoctorsRoute =  ` ${host}/api/doctors/getdoctors`
export const getDoctorsByCategoryRoute =  ` ${host}/api/doctors/by-category`
export const getDoctorsByIdRoute =  ` ${host}/api/doctors`

export const loginRoute =  ` ${host}/api/auth/login`
export const registerRoute =  ` ${host}/api/auth/register`
export const logoutRoute =  ` ${host}/api/auth/logout/:id`
export const getUserDetailsRoute =  ` ${host}/api/auth/getdetails`

export const createappointementRoute =  ` ${host}/api/appointement`
export const getAllappointementsRoute =  ` ${host}/api/appointement/getappointement`
export const getAppointementsbyUserIdRoute =  ` ${host}/api/appointement/byuserid`
export const getAppointementsForDoctorRoute =  ` ${host}/api/appointement/forDoctor`
export const updateAppointementsRoute =  ` ${host}/api/appointement/update`


export const deleteappointementRoute =  ` ${host}/api/appointement/deleteapp`

