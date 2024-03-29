import React, { useState } from 'react';
import { SearchIcon, CashIcon } from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const PayrollList = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('Yanti Sari');
  const [selectedMonth, setSelectedMonth] = useState('2024-03');
  const [activePaymentButton, setActivePaymentButton] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const payrollData = [
    {
      id: 1,
      employee: 'Fakhrity Hikmawan',
      email: 'fakhrityhikmawan@gmail.com',
      employeeId: '011100',
      payslipType: 'Per Month',
      basicSalary: 'IDR10,000,000',
      netSalary: 'IDR10,000,000',
      status: 'Paid'
    },
    {
      id: 2,
      employee: 'Arfara Yema Samgusdian',
      email: 'arfarayemasamgusdian@gmail.com',
      employeeId: '011101',
      payslipType: 'Per Month',
      basicSalary: 'IDR10,000,000',
      netSalary: 'IDR10,000,000',
      status: 'Un Paid'
    }
  ];

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-5 shadow-md rounded-md mb-5">
        <div className="flex-grow mr-5 mb-5 md:mb-0">
          <label htmlFor="employee" className="block text-sm text-gray-800 mb-1">Employee</label>
          <select id="employee" value={selectedEmployee} onChange={handleEmployeeChange} className="block w-full px-3 py-1.5 text-base leading-6 text-gray-900 bg-white bg-clip-padding border border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
            <option value="Yanti Sari">Fakhrity Hikmawan</option>
          </select>
        </div>
        <div className="flex-grow mr-5 mb-5 md:mb-0">
          <label htmlFor="monthSelect" className="block text-sm text-gray-800 mb-1">Select Month</label>
          <input type="month" id="monthSelect" value={selectedMonth} onChange={handleMonthChange} className="block w-full px-3 py-1.5 text-base leading-6 text-gray-900 bg-white bg-clip-padding border border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
        </div>
        <div>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 mt-5">
            <SearchIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="border border-gray-200 rounded overflow-hidden mx-5 my-5">
        <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Payment Info for {selectedMonth}</h2>
        </div>
        <div className="p-5">
          <div className="flex justify-between mb-4">
            <label className="flex items-center">
              Show
              <select className="mx-2 rounded border border-gray-300">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              entries
            </label>
            <div className="flex justify-end">
              <input type="search" placeholder="Search" className="rounded border border-gray-300 p-2" />
            </div>
          </div>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payslip Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payrollData.map((data) => (
                  <tr key={data.id}
                      onMouseEnter={() => setActivePaymentButton(data.id)}
                      onMouseLeave={() => setActivePaymentButton(null)}
                      className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex justify-between items-center">
                      <div>
                        <span>{data.employee}</span>
                        <span className="text-xs text-gray-500 block">{data.email}</span>
                      </div>
                      {activePaymentButton === data.id && (
                        <CashIcon
                          className="h-5 w-5 text-blue-500 hover:text-blue-700 cursor-pointer ml-4"
                          onClick={openPaymentModal}
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.employeeId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.payslipType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.basicSalary}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.netSalary}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${data.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {data.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-gray-500 text-sm my-4 flex justify-between items-center">
            Showing 1 to 1 of 1 records
            <div>
              <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none">
                Previous
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none ml-2">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={isPaymentModalOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closePaymentModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>
            <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex justify-between items-start">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Make Payment
                  </Dialog.Title>
                  <div className="ml-auto">
                    <button onClick={closePaymentModal} className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="bg-white space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900">Basic Salary</h3>
                      <p className="text-sm text-gray-900">IDR10,000,000.00</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900">Allowances</h3>
                      <p className="text-sm text-gray-900">IDR0</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900">Commissions</h3>
                      <p className="text-sm text-gray-900">IDR0</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900">Reimbursements</h3>
                      <p className="text-sm text-gray-900">IDR0</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900">Statutory deductions</h3>
                      <p className="text-sm text-gray-900">IDR0</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900">Advance Salary</h3>
                      <p className="text-sm text-gray-900">IDR0</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900">Loan</h3>
                      <p className="text-sm text-gray-900">IDR0</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900">Net Salary</h3>
                      <p className="text-sm text-gray-900">IDR10,000,000</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <label htmlFor="comments" className="block text-sm font-medium text-gray-700">
                    Payslip Comments
                  </label>
                  <textarea id="comments" name="comments" rows="3" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"></textarea>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button type="button" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm">
                    Make Payment
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default PayrollList;
