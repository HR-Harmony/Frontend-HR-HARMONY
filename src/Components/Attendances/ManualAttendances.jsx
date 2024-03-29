import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { APIAttendance } from '@/Apis/APIAttendance';
import { APIEmployees } from '@/Apis/APIEmployees';
import { toast } from 'react-toastify';

const initialNewAttendanceState = {
  employee_id: '',
  attendance_date: '',
  in_time: '',
  out_time: ''
};

const ManualAttendances = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedAttendanceId, setSelectedAttendanceId] = useState(null);
  const [filterDate, setFilterDate] = useState('');
  const [filterEmployeeId, setFilterEmployeeId] = useState('');
  const [attendances, setAttendances] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredAttendances, setFilteredAttendances] = useState([]);
  const [newAttendance, setNewAttendance] = useState(initialNewAttendanceState);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchAttendancesAndEmployees = async () => {
    setIsLoading(true);
    try {
      const attendancesData = await APIAttendance.getAllAttendances();
      const employeesData = await APIEmployees.getAllEmployees();
      setAttendances(attendancesData.data || []);
      setEmployees(employeesData.employees || []);
      setFilteredAttendances(attendancesData.data || []);
    } catch (error) {
      toast.error('Failed to fetch data');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAttendancesAndEmployees();
  }, []);

  useEffect(() => {
    setFilteredAttendances(attendances);
  }, [attendances]);

  const handleEditClick = (attendance) => {
    setCurrentEdit({
      ...attendance,
      employee_id: attendance.employee_id.toString(),
    });
    setIsEditModalOpen(true);
  };

  const handleAddNewClick = () => {
    setIsAddModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAttendance({ ...newAttendance, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const dataToSend = {
      ...newAttendance,
      employee_id: parseInt(newAttendance.employee_id, 10)
    };

    try {
      const response = await APIAttendance.createAttendance(dataToSend);
      if (response.code === 201) {
        setIsAddModalOpen(false);
        setNewAttendance(initialNewAttendanceState);
        fetchAttendancesAndEmployees();
        toast.success("Attendance record added successfully");
      }
    } catch (error) {
      toast.error('Failed to create attendance record');
    }
    setIsLoading(false);
  };

  const handleDeleteClick = (attendanceId) => {
    setSelectedAttendanceId(attendanceId);
    setShowDeleteConfirmation(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const dataToUpdate = {
      ...currentEdit,
      employee_id: parseInt(currentEdit.employee_id, 10),
    };
  
    try {
      const response = await APIAttendance.updateAttendance(dataToUpdate.id, dataToUpdate);
      if (response.code === 200) {
        toast.success("Attendance record updated successfully");
        setIsEditModalOpen(false);
        fetchAttendancesAndEmployees();
      }
    } catch (error) {
      toast.error("Failed to update attendance record");
    }
    setIsLoading(false);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    try {
      await APIAttendance.deleteAttendance(selectedAttendanceId);
      setShowDeleteConfirmation(false);
      fetchAttendancesAndEmployees();
      toast.success("Attendance record deleted successfully");
    } catch (error) {
      toast.error("Failed to delete attendance record.");
    }
    setIsLoading(false);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const filtered = attendances.filter((attendance) => {
      const matchesDate = filterDate ? attendance.attendance_date === filterDate : true;
      const matchesEmployee = filterEmployeeId ? attendance.employee_id.toString() === filterEmployeeId : true;
      return matchesDate && matchesEmployee;
    });
  
    setFilteredAttendances(filtered);
    setIsLoading(false);
  };

  return (
    <div className="max-w-6xl ml-auto mr-auto">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full lg:w-1/3 px-3 lg:mb-0">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
              <h5 className="text-lg font-semibold text-gray-700">Filter Attendance</h5>
            </div>
            <form className="p-4" onSubmit={handleFilterSubmit}>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input type="date" className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" id="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
              </div>
              <div className="mt-3">
                <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700">Employee</label>
                <select id="employee" className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" value={filterEmployeeId} onChange={(e) => setFilterEmployeeId(e.target.value)}>
                  <option value="">Select an employee</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.first_name} {employee.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 mt-3 mb-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Filter</button>
            </form>
          </div>
        </div>

        <div className="w-full lg:w-2/3 lg:mb-0">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center p-5 bg-gray-50 border-b border-gray-200">
              <h5 className="text-lg font-semibold text-gray-700">View Attendance</h5>
              <button
                onClick={handleAddNewClick}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Add New
              </button>
            </div>
            <div className="flex justify-between px-3 mt-3">
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
            <div className="overflow-x-auto mb-4 px-3">
              <table className="min-w-screen divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">In Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Out Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Total Hours</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-sm text-gray-500">Loading attendances data...</td>
                    </tr>
                  ) : filteredAttendances.length > 0 ? (
                    filteredAttendances.map((attendance) => {
                      const employee = employees.find(emp => emp.id === attendance.employee_id);
                      return (
                        <tr key={attendance.id}
                            onMouseEnter={() => setHoveredId(attendance.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="group hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 relative flex justify-between">
                            <span>{employee ? `${employee.first_name} ${employee.last_name}` : 'N/A'}</span>
                            {hoveredId === attendance.id && (
                              <div className="flex items-center">
                                <button onClick={() => handleEditClick(attendance)} className="text-indigo-600 hover:text-indigo-900 ml-5 mr-2">
                                  <PencilAltIcon className="h-5 w-5" />
                                </button>
                                <button onClick={() => handleDeleteClick(attendance.id)} className="text-red-600 hover:text-red-800">
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendance.attendance_date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendance.in_time}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendance.out_time}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendance.total_work || 'N/A'}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-sm text-gray-500">No attendance data available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="text-gray-500 text-sm my-4 flex justify-between items-center px-3">
                Showing 1 to {filteredAttendances.length} of {filteredAttendances.length} records
                <div>
                  <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 mb-4 ml-3 rounded focus:outline-none">
                    Previous
                  </button>
                  <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none ml-2">
                    Next
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" id="edit-modal">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-lg font-semibold">Edit Attendance Information</h4>
              <button onClick={() => setIsEditModalOpen(false)} className="text-black">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label htmlFor="editEmployee" className="block text-sm font-medium text-gray-700">Employee *</label>
                <select id="editEmployee" name="employee_id" value={currentEdit.employee_id} onChange={(e) => setCurrentEdit({ ...currentEdit, employee_id: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.first_name} {employee.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="editDate" className="block text-sm font-medium text-gray-700">Attendance Date *</label>
                <input type="date" id="editDate" name="attendance_date" value={currentEdit.attendance_date} onChange={(e) => setCurrentEdit({ ...currentEdit, attendance_date: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="editInTime" className="block text-sm font-medium text-gray-700">In Time *</label>
                  <input type="time" id="editInTime" name="in_time" value={currentEdit.in_time} onChange={(e) => setCurrentEdit({ ...currentEdit, in_time: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div>
                  <label htmlFor="editOutTime" className="block text-sm font-medium text-gray-700">Out Time *</label>
                  <input type="time" id="editOutTime" name="out_time" value={currentEdit.out_time} onChange={(e) => setCurrentEdit({ ...currentEdit, out_time: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3 mt-4">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                  Close
                </button>
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Transition appear show={isAddModalOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => setIsAddModalOpen(false)}>
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
                <div className="flex justify-between items-center mb-5">
                  <h4 className="text-lg font-semibold">Add Attendance Information</h4>
                  <button onClick={() => setIsAddModalOpen(false)} className="text-black">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <p className="mb-5">We need below required information to add this record.</p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="attendanceEmployee" className="block text-sm font-medium text-gray-700">Employee</label>
                    <select id="attendanceEmployee" name="employee_id" value={newAttendance.employee_id} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                      <option>Select an employee</option>
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.first_name} {employee.last_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="attendanceDate" className="block text-sm font-medium text-gray-700">Attendance Date</label>
                    <input type="date" id="attendanceDate" name="attendance_date" value={newAttendance.attendance_date} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="inTime" className="block text-sm font-medium text-gray-700">In Time *</label>
                      <input type="time" id="inTime" name="in_time" value={newAttendance.in_time} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div>
                      <label htmlFor="outTime" className="block text-sm font-medium text-gray-700">Out Time *</label>
                      <input type="time" id="outTime" name="out_time" value={newAttendance.out_time} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-3 ">
                    <button type="button" onClick={() => setIsAddModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 mt-1 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                      Close
                    </button>
                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 mt-1 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-lg font-semibold">Confirm Delete</h4>
              <button onClick={() => setShowDeleteConfirmation(false)} className="text-black">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <p className="mb-5">Are you sure you want to delete this attendance record?</p>
            <div className="flex items-center justify-end space-x-3">
              <button type="button" onClick={() => setShowDeleteConfirmation(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                Cancel
              </button>
              <button type="button" onClick={handleConfirmDelete} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManualAttendances
