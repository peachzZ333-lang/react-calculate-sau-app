import { useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import bmrImg from './../assets/bmr.png';
import Footer from './../components/Footer';

export default function Bmr() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [bmr, setBmr] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();

        const numWeight = parseFloat(weight);
        const numHeight = parseFloat(height);
        const numAge = parseFloat(age);

        if (!weight || !height || !age || isNaN(numWeight) || isNaN(numHeight) || isNaN(numAge) || numWeight <= 0 || numHeight <= 0 || numAge <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                text: 'โปรดกรอกน้ำหนัก ส่วนสูง และอายุเป็นตัวเลขที่ถูกต้อง',
                confirmButtonColor: '#2563eb',
                confirmButtonText: 'ตกลง'
            });
            return;
        }

        // สูตรคำนวณ BMR ตามที่ระบุใน Figma
        const calculatedBmr = gender === 'male'
            ? 66 + (13.7 * numWeight) + (5 * numHeight) - (6.8 * numAge)
            : 665 + (9.6 * numWeight) + (1.8 * numHeight) - (4.7 * numAge);

        setBmr(calculatedBmr.toFixed(2));
    };

    const handleReset = () => {
        setWeight('');
        setHeight('');
        setAge('');
        setGender('male');
        setBmr(null);
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-slate-50 py-10 px-4">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {/* ส่วนหัวข้อ */}
                    <div className="text-center">
                        <h1 className="font-kanit text-3xl font-bold text-gray-800">
                            BMR Calculator
                        </h1>
                        <p className="font-itim text-gray-500 mt-1">
                            คำนวณอัตราการเผาผลาญพลังงาน
                        </p>
                    </div>

                    {/* แสดงรูปภาพ */}
                    <div className="flex justify-center my-6">
                        <img
                            src={bmrImg}
                            alt="BMR Calculator"
                            className="w-24 h-24 object-contain transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* ฟอร์มกรอกข้อมูล */}
                    <form onSubmit={handleCalculate} className="space-y-4">
                        <div>
                            <label className="block font-kanit text-gray-700 font-medium mb-1.5">
                                น้ำหนักตัว (กิโลกรัม)
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="เช่น 60"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 font-itim text-gray-800
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        <div>
                            <label className="block font-kanit text-gray-700 font-medium mb-1.5">
                                ส่วนสูง (เซนติเมตร)
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                placeholder="เช่น 170"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 font-itim text-gray-800
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        <div>
                            <label className="block font-kanit text-gray-700 font-medium mb-1.5">
                                อายุ (ปี)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="120"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="เช่น 25"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 font-itim text-gray-800
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* เพศ */}
                        <div>
                            <label className="block font-kanit text-gray-700 font-medium mb-2">
                                เพศ
                            </label>
                            <div className="flex items-center gap-6 font-itim text-gray-700">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={gender === 'male'}
                                        onChange={() => setGender('male')}
                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span>ชาย</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={gender === 'female'}
                                        onChange={() => setGender('female')}
                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span>หญิง</span>
                                </label>
                            </div>
                        </div>

                        {/* ปุ่มคำนวณ (สีน้ำเงิน) และ รีเซ็ต (สีแดง) ด้านข้างกันตามแบบใน Figma */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-kanit font-semibold
                                           py-2.5 rounded-xl shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
                            >
                                คำนวณ
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-kanit font-semibold
                                           py-2.5 rounded-xl shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
                            >
                                รีเซ็ต
                            </button>
                        </div>
                    </form>

                    {/* ส่วนแสดงผลลัพธ์ */}
                    {bmr !== null && (
                        <div className="mt-6 p-4 rounded-xl border border-blue-200 bg-blue-50 text-center transition-all duration-300">
                            <p className="font-kanit text-gray-600 text-sm">
                                ค่า BMR ที่ได้คือ
                            </p>
                            <p className="font-kanit text-3xl font-bold text-blue-700 my-1">
                                {Number(bmr).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className="font-itim text-sm text-gray-600">
                                กิโลแคลอรี / วัน (พลังงานที่ร่างกายต้องการขณะพัก)
                            </p>
                        </div>
                    )}

                    {/* ปุ่มกลับหน้าหลัก */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <Link
                            to="/"
                            className="w-full block text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-kanit font-medium
                                       py-2.5 rounded-xl transition duration-200"
                        >
                            กลับหน้าหลัก
                        </Link>
                    </div>
                </div>
            </div>

            {/* แสดง Footer */}
            <Footer />
        </div>
    );
}
