import React, { useState, useEffect } from 'react';
import Layout from '../../../../../layout';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonOne, ButtonTwo, Breadcrumb } from '../../../../../components';
import { createDataOvertime, getMe, getDataPegawai } from '../../../../../config/redux/action';
import Swal from 'sweetalert2';
import moment from 'moment';

const FormAddDataOvertime = () => {
    const [employee_id, setEmployeeId] = useState('');
    const [nama_pegawai, setNamaPegawai] = useState('');
    const [overtime_date, setOvertimeDate] = useState('');
    const [hours, setHours] = useState('');
    const [reason, setReason] = useState('');
    const [msg, setMsg] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, user } = useSelector((state) => state.auth);
    const { dataPegawai } = useSelector((state) => state.dataPegawai);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate('/login');
        }
        if (user && user.hak_akses !== 'admin') {
            navigate('/dashboard');
        }
    }, [isError, user, navigate]);

    useEffect(() => {
        dispatch(getDataPegawai());
    }, [dispatch]);

    const handleEmployeeChange = (e) => {
        const id = e.target.value;
        setEmployeeId(id);
        const emp = dataPegawai.find(p => p.id === Number(id));
        if(emp) {
            setNamaPegawai(emp.nama_pegawai);
        } else {
            setNamaPegawai('');
        }
    };

    const validateForm = () => {
        if (!employee_id || !overtime_date || !hours || !reason) {
            setMsg('All fields are required');
            return false;
        }

        const hrs = parseInt(hours, 10);
        if (isNaN(hrs) || hrs < 1 || hrs > 6) {
            setMsg('Hours must be between 1 and 6');
            return false;
        }

        const selectedDate = moment(overtime_date);
        const today = moment().startOf('day');
        const diffDays = today.diff(selectedDate, 'days');

        if (diffDays < 0) {
            setMsg('Date cannot be future');
            return false;
        }

        if (diffDays > 7) {
            setMsg('Date cannot be older than 7 days');
            return false;
        }

        if (reason.trim().length < 10) {
            setMsg('Reason must be at least 10 characters');
            return false;
        }

        return true;
    };

    const saveOvertime = async (e) => {
        e.preventDefault();
        setMsg('');

        if (!validateForm()) return;

        try {
            await dispatch(createDataOvertime({
                employee_id,
                nama_pegawai,
                overtime_date,
                hours: parseInt(hours, 10),
                reason
            }));
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Data entered successfully',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/data-overtime');
        } catch (error) {
            setMsg(error.response?.data?.msg || 'Error adding data');
        }
    };

    return (
        <Layout>
            <Breadcrumb pageName="Form Overtime" />
            <div className="sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Tambah Data Overtime
                            </h3>
                        </div>
                        <form onSubmit={saveOvertime}>
                            <div className="p-6.5">
                                <p className="text-red-500 mb-4 font-medium">{msg}</p>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className='w-full xl:w-1/2'>
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Nama Pegawai <span className="text-meta-1">*</span>
                                        </label>
                                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                                            <select
                                                value={employee_id}
                                                onChange={handleEmployeeChange}
                                                className="relative z-20 w-full appearance-none rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary py-3 px-4 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            >
                                                <option value="" disabled className="text-body dark:text-bodydark">
                                                    Pilih Pegawai
                                                </option>
                                                {dataPegawai.map((pegawai) => (
                                                    <option key={pegawai.id} value={pegawai.id} className="text-body dark:text-bodydark">
                                                        {pegawai.nama_pegawai}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='w-full xl:w-1/2'>
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Tanggal Lembur <span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={overtime_date}
                                            onChange={(e) => setOvertimeDate(e.target.value)}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row mt-10">
                                    <div className='w-full xl:w-1/2'>
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Jumlah Jam <span className="text-meta-1">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            value={hours}
                                            onChange={(e) => setHours(e.target.value)}
                                            placeholder="Masukkan jumlah jam (1-6)"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>

                                    <div className='w-full xl:w-1/2'>
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Alasan <span className="text-meta-1">*</span>
                                        </label>
                                        <textarea
                                            rows="4"
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            placeholder="Alasan lembur (min. 10 chars)"
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row w-full gap-3 text-center">
                                    <div>
                                        <ButtonOne type="submit">
                                            <span>Simpan</span>
                                        </ButtonOne>
                                    </div>
                                    <Link to="/data-overtime">
                                        <ButtonTwo>
                                            <span>Kembali</span>
                                        </ButtonTwo>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default FormAddDataOvertime;
