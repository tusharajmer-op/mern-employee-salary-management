import { useState, useEffect } from 'react';
import Layout from '../../../../layout';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { Breadcrumb, ButtonOne } from '../../../../components';

import { FaRegEdit, FaPlus, FaCheck } from 'react-icons/fa';
import { BsTrash3 } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import {
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight
} from 'react-icons/md';

import {
    getMe,
    getDataOvertime,
    deleteDataOvertime,
    approveDataOvertime
} from '../../../../config/redux/action';

const ITEMS_PER_PAGE = 4;

const DataOvertime = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, user } = useSelector(
        (state) => state.auth
    );

    // add reducer slice same way repo does others
    const { dataOvertime = [] } = useSelector(
        (state) => state.dataOvertime
    );

    const totalPages = Math.ceil(
        dataOvertime.length / ITEMS_PER_PAGE
    );

    const startIndex =
        (currentPage - 1) * ITEMS_PER_PAGE;

    const endIndex =
        startIndex + ITEMS_PER_PAGE;


    const filteredDataOvertime =
        dataOvertime.filter((item) => {

            const keyword =
                searchKeyword.toLowerCase();

            const matchName =
                item.nama_pegawai
                    ?.toLowerCase()
                    .includes(keyword);

            const matchStatus =
                filterStatus === "" ||
                item.status === filterStatus;

            return matchName && matchStatus;
        });


    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1)
        }
    }

    const handleSearch = (e) => {
        setSearchKeyword(e.target.value);
    }

    const approveEntry = (id) => {
        Swal.fire({
            title: 'Approve overtime?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(
                    approveDataOvertime(id)
                ).then(() => {
                    dispatch(
                        getDataOvertime()
                    )
                })
            }
        })
    }

    const onDelete = (id) => {
        Swal.fire({
            title: 'Konfirmasi',
            text: 'Hapus overtime entry?',
            icon: 'question',
            showCancelButton: true
        }).then((r) => {
            if (r.isConfirmed) {
                dispatch(
                    deleteDataOvertime(id)
                ).then(() => {
                    dispatch(
                        getDataOvertime()
                    )
                })
            }
        })
    }

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        dispatch(
            getDataOvertime(
                startIndex,
                endIndex
            )
        )
    }, [
        dispatch,
        startIndex,
        endIndex
    ])

    useEffect(() => {
        if (isError) {
            navigate('/login')
        }

        if (
            user &&
            user.hak_akses !== 'admin'
        ) {
            navigate('/dashboard')
        }

    }, [
        isError,
        user,
        navigate
    ])

    const paginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;

        const startPage = Math.max(
            1,
            currentPage -
            Math.floor(
                maxVisiblePages / 2
            )
        );

        const endPage = Math.min(
            totalPages,
            startPage +
            maxVisiblePages - 1
        );

        for (
            let page = startPage;
            page <= endPage;
            page++
        ) {
            items.push(
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`py-2 px-4 border rounded-lg ${currentPage === page
                            ? 'bg-primary text-white'
                            : 'hover:bg-gray-2'
                        }`}
                >
                    {page}
                </button>
            )
        }

        return items
    }


    return (
        <Layout>

            <Breadcrumb
                pageName='Data Overtime'
            />

            <Link to="/data-overtime/form-data-overtime/add">
                <ButtonOne>
                    <span>Tambah Overtime</span>
                    <span>
                        <FaPlus />
                    </span>
                </ButtonOne>
            </Link>


            <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-6'>

                <div className="flex justify-between items-center mt-4 flex-col md:flex-row">

                    <div className="relative mb-4">

                        <input
                            type='text'
                            placeholder='Cari Pegawai...'
                            value={searchKeyword}
                            onChange={handleSearch}
                            className='rounded-lg border-[1.5px] border-stroke bg-transparent py-2 pl-10 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary left-0'
                        />

                        <span className='absolute left-2 py-3 text-xl'>
                            <BiSearch />
                        </span>

                    </div>

                    <select
                        value={filterStatus}
                        onChange={(e) =>
                            setFilterStatus(
                                e.target.value
                            )}
                        className="relative z-20 appearance-none rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                        <option value="">
                            Semua Status
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                        <option value="approved">
                            Approved
                        </option>

                        <option value="rejected">
                            Rejected
                        </option>

                    </select>

                </div>



                <div className='max-w-full overflow-x-auto py-4'>

                    <table className='w-full table-auto'>

                        <thead>
                            <tr className='bg-gray-2 text-left dark:bg-meta-4'>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>No</th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>Nama Pegawai</th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>Tanggal</th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>Jam Lembur</th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>Alasan</th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>Status</th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>Aksi</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredDataOvertime
                                .slice(
                                    startIndex,
                                    endIndex
                                )
                                .map((data, index) => (

                                    <tr key={data.id}>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{startIndex + index + 1}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{data.nama_pegawai}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{data.overtime_date}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{data.hours} Jam</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{data.reason}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                                                data.status === 'approved' ? 'bg-success text-success' : 'bg-warning text-warning'
                                            }`}>
                                                {data.status}
                                            </p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <div className='flex items-center space-x-3'>
                                                {/* <Link
                                                    to={`/data-overtime/edit/${data.id}`}
                                                    className='hover:text-primary'
                                                >
                                                    <FaRegEdit />
                                                </Link> */}
                                                {data.status === "pending" && (
                                                    <button
                                                        onClick={() =>
                                                            approveEntry(
                                                                data.id
                                                            )}
                                                        className='hover:text-success'
                                                    >
                                                        <FaCheck />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() =>
                                                        onDelete(
                                                            data.id
                                                        )}
                                                    className='hover:text-danger'
                                                >
                                                    <BsTrash3 />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                ))}

                        </tbody>
                    </table>

                </div>



                <div className="flex justify-between items-center mt-4">

                    <button
                        disabled={currentPage === 1}
                        onClick={goToPrevPage}
                    >
                        <MdKeyboardDoubleArrowLeft />
                    </button>

                    <div className="flex gap-2">
                        {paginationItems()}
                    </div>

                    <button
                        disabled={
                            currentPage === totalPages
                        }
                        onClick={goToNextPage}
                    >
                        <MdKeyboardDoubleArrowRight />
                    </button>

                </div>

            </div>

        </Layout>
    )

}

export default DataOvertime;