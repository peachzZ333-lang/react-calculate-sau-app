import { useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import bmiImg from './../assets/bmi.png';
import Footer from './../components/Footer';

export default function Bmi() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [interpretation, setInterpretation] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();

        const numWeight = parseFloat(weight);
        const numHeight = parseFloat(height);

        if (!weight || !height || isNaN(numWeight) || isNaN(numHeight) || numWeight <= 0 || numHeight <= 0) {
            Swal.fire({
                icon: 'warning',
                title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                text: 'โปรดกรอกน้ำหนักและส่วนสูงเป็นตัวเลขที่มากกว่า 0',
                confirmButtonColor: '#2563eb',
                confirmButtonText: 'ตกลง'
            });
            return;
        }

        // สูตรคำนวณ BMI = น้ำหนัก (กก.) / (ส่วนสูง (เมตร))^2
        const heightInMeters = numHeight / 100;
        const bmiValue = numWeight / (heightInMeters * heightInMeters);
        const formattedBmi = bmiValue.toFixed(2);
        setBmi(formattedBmi);

        // แปลผลค่า BMI ตามเกณฑ์มาตรฐานคนเอเชีย
        if (bmiValue < 18.5) {
            setInterpretation({
                label: 'น้ำหนักน้อยกว่าเกณฑ์ (ผอมเกินไป)',
                color: 'text-blue-600',
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-200'
            });
        } else if (bmiValue <= 22.9) {
            setInterpretation({
                label: 'น้ำหนักปกติ (สมส่วน)',
                color: 'text-green-600',
                bgColor: 'bg-green-50',
                borderColor: 'border-green-200'
            });
        } else if (bmiValue <= 24.9) {
            setInterpretation({
                label: 'น้ำหนักเกิน (ท้วม)',
                color: 'text-yellow-600',
                bgColor: 'bg-yellow-50',
                borderColor: 'border-yellow-200'
            });
        } else if (bmiValue <= 29.9) {
            setInterpretation({
                label: 'โรคอ้วนระดับ 1 (อ้วน)',
                color: 'text-orange-600',
                bgColor: 'bg-orange-50',
                borderColor: 'border-orange-200'
            });
        } else {
            setInterpretation({
                label: 'โรคอ้วนระดับ 2 (อ้วนมาก / อันตราย)',
                color: 'text-red-600',
                bgColor: 'bg-red-50',
                borderColor: 'border-red-200'
            });
        }
    };

    const handleReset = () => {
        setWeight('');
        setHeight('');
        setBmi(null);
        setInterpretation(null);
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-slate-50 py-10 px-4">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {/* ส่วนหัวข้อ */}
                    <div className="text-center">
                        <h1 className="font-kanit text-3xl font-bold text-gray-800">
                            BMI Calculator
                        </h1>
                        <p className="font-itim text-gray-500 mt-1">
                            คำนวณดัชนีมวลกาย
                        </p>
                    </div>

                    {/* แสดงรูปภาพ */}
                    <div className="flex justify-center my-6">
                        <img
                            src={bmiImg}
                            alt="BMI Calculator"
                            className="w-24 h-24 object-contain transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* ฟอร์มกรอกข้อมูล */}
                    <form onSubmit={handleCalculate} className="space-y-4">
                        <div>
                            <label className="block font-kanit text-gray-700 font-medium mb-1.5">
                                น้ำหนัก (กิโลกรัม)
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="เช่น 65"
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

                        {/* ปุ่มคำนวณ และ รีเซ็ต */}
                        <div className="flex flex-col gap-2.5 pt-2">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-kanit font-semibold
                                           py-2.5 rounded-xl shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
                            >
                                คำนวณ
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-kanit font-semibold
                                           py-2.5 rounded-xl transition duration-200 cursor-pointer"
                            >
                                รีเซ็ต
                            </button>
                        </div>
                    </form>

                    {/* ส่วนแสดงผลลัพธ์ */}
                    {bmi !== null && interpretation && (
                        <div className={`mt-6 p-4 rounded-xl border ${interpretation.borderColor} ${interpretation.bgColor} text-center transition-all duration-300`}>
                            <p className="font-kanit text-gray-600 text-sm">
                                ค่า BMI ที่ได้คือ
                            </p>
                            <p className="font-kanit text-3xl font-bold text-blue-700 my-1">
                                {bmi}
                            </p>
                            <p className={`font-itim text-lg font-semibold ${interpretation.color}`}>
                                {interpretation.label}
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
