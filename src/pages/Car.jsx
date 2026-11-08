import { useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import carImg from './../assets/car.png';
import Footer from './../components/Footer';

export default function Car() {
    const [borrowerName, setBorrowerName] = useState('');
    const [carPrice, setCarPrice] = useState('');
    const [downPaymentPercent, setDownPaymentPercent] = useState('15');
    const [interestRate, setInterestRate] = useState('');
    const [installmentMonths, setInstallmentMonths] = useState('48');
    const [result, setResult] = useState(null);

    const percentOptions = ['10', '15', '20', '25', '30'];
    const monthOptions = [
        { months: 24, label: '24 เดือน (2 ปี)' },
        { months: 36, label: '36 เดือน (3 ปี)' },
        { months: 48, label: '48 เดือน (4 ปี)' },
        { months: 60, label: '60 เดือน (5 ปี)' },
        { months: 72, label: '72 เดือน (6 ปี)' },
        { months: 84, label: '84 เดือน (7 ปี)' },
    ];

    // คำนวณเงินดาวน์แบบเรียลไทม์เพื่อแสดงให้ผู้ใช้เห็น
    const calculatedDownAmount = carPrice && !isNaN(Number(carPrice))
        ? (Number(carPrice) * (Number(downPaymentPercent) / 100))
        : 0;

    const handleCalculate = (e) => {
        e.preventDefault();

        const price = parseFloat(carPrice);
        const downPercent = parseFloat(downPaymentPercent);
        const rate = parseFloat(interestRate);
        const months = parseInt(installmentMonths, 10);

        if (
            !carPrice ||
            isNaN(price) ||
            price <= 0 ||
            isNaN(downPercent) ||
            downPercent < 0 ||
            downPercent >= 100 ||
            !interestRate ||
            isNaN(rate) ||
            rate < 0 ||
            !installmentMonths ||
            isNaN(months) ||
            months <= 0
        ) {
            Swal.fire({
                icon: 'warning',
                title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                text: 'โปรดกรอกราคารถยนต์ เงินดาวน์ อัตราดอกเบี้ย และเลือกจำนวนเดือนที่ผ่อนให้ถูกต้อง',
                confirmButtonColor: '#2563eb',
                confirmButtonText: 'ตกลง'
            });
            return;
        }

        // สูตรคำนวณตามที่ระบุใน Figma:
        // 1. คำนวณยอดจัดไฟแนนซ์: ราคารถ - เงินดาวน์
        const downPaymentAmount = price * (downPercent / 100);
        const financeAmount = price - downPaymentAmount;

        // 2. คำนวณดอกเบี้ย: ยอดจัดไฟแนนซ์ x อัตราดอกเบี้ยรายปี x จำนวนปีที่ผ่อน
        const years = months / 12;
        const totalInterest = financeAmount * (rate / 100) * years;

        // 3. คำนวณยอดรวม ทั้งหมดที่ต้องผ่อน: ยอดจัดไฟแนนซ์ + ดอกเบี้ยทั้งหมด
        const totalPayment = financeAmount + totalInterest;

        // 4. คำนวณค่างวดต่อเดือน: ยอดรวมทั้งหมดที่ต้องผ่อน / จำนวนเดือนที่ผ่อน
        const monthlyInstallment = totalPayment / months;

        setResult({
            borrowerName: borrowerName.trim() || 'ผู้ขอสินเชื่อ',
            price,
            downPercent,
            downPaymentAmount,
            financeAmount,
            rate,
            months,
            years,
            totalInterest,
            totalPayment,
            monthlyInstallment
        });
    };

    const handleReset = () => {
        setBorrowerName('');
        setCarPrice('');
        setDownPaymentPercent('15');
        setInterestRate('');
        setInstallmentMonths('48');
        setResult(null);
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-slate-50 py-10 px-4">
            <div className="w-full max-w-lg mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {/* ส่วนหัวข้อ */}
                    <div className="text-center">
                        <h1 className="font-kanit text-3xl font-bold text-gray-800">
                            Car Installment Calculator
                        </h1>
                        <p className="font-itim text-gray-500 mt-1">
                            คำนวณค่างวดรถยนต์
                        </p>
                    </div>

                    {/* แสดงรูปภาพ */}
                    <div className="flex justify-center my-6">
                        <img
                            src={carImg}
                            alt="Car Calculator"
                            className="w-24 h-24 object-contain transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* ฟอร์มกรอกข้อมูล */}
                    <form onSubmit={handleCalculate} className="space-y-4">
                        {/* 1. ชื่อผู้กู้ */}
                        <div>
                            <label className="block font-kanit text-gray-700 font-medium mb-1.5">
                                ชื่อผู้กู้
                            </label>
                            <input
                                type="text"
                                value={borrowerName}
                                onChange={(e) => setBorrowerName(e.target.value)}
                                placeholder="ป้อนชื่อผู้กู้ (ถ้ามี)"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 font-itim text-gray-800
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* 2. ราคารถยนต์ */}
                        <div>
                            <label className="block font-kanit text-gray-700 font-medium mb-1.5">
                                ราคารถยนต์ (บาท)
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={carPrice}
                                onChange={(e) => setCarPrice(e.target.value)}
                                placeholder="เช่น 800000"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 font-itim text-gray-800
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* 3. เงินดาวน์ (%) พร้อมตัวเลือก Radio Buttons */}
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="block font-kanit text-gray-700 font-medium">
                                    เงินดาวน์ (%)
                                </label>
                                {calculatedDownAmount > 0 && (
                                    <span className="font-itim text-sm text-blue-600 font-semibold">
                                        เป็นเงิน {calculatedDownAmount.toLocaleString('th-TH', { maximumFractionDigits: 2 })} บาท
                                    </span>
                                )}
                            </div>
                            <input
                                type="number"
                                step="any"
                                min="0"
                                max="99"
                                value={downPaymentPercent}
                                onChange={(e) => setDownPaymentPercent(e.target.value)}
                                placeholder="เช่น 15"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 font-itim text-gray-800
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />

                            {/* Radio options สำหรับเลือก % เงินดาวน์ */}
                            <div className="flex flex-wrap items-center gap-4 mt-2 px-1">
                                {percentOptions.map((pct) => (
                                    <label key={pct} className="flex items-center gap-1.5 cursor-pointer font-itim text-sm text-gray-600">
                                        <input
                                            type="radio"
                                            name="downPercentRadio"
                                            value={pct}
                                            checked={downPaymentPercent === pct}
                                            onChange={() => setDownPaymentPercent(pct)}
                                            className="text-blue-600 focus:ring-blue-500 cursor-pointer"
                                        />
                                        <span>{pct}%</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* 4. อัตราดอกเบี้ย (% ต่อปี) */}
                        <div>
                            <label className="block font-kanit text-gray-700 font-medium mb-1.5">
                                อัตราดอกเบี้ย (% ต่อปี)
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={interestRate}
                                onChange={(e) => setInterestRate(e.target.value)}
                                placeholder="เช่น 2.5"
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 font-itim text-gray-800
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* 5. จำนวนเดือนที่ผ่อน (Dropdown) */}
                        <div>
                            <label className="block font-kanit text-gray-700 font-medium mb-1.5">
                                จำนวนเดือนที่ผ่อน
                            </label>
                            <select
                                value={installmentMonths}
                                onChange={(e) => setInstallmentMonths(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 font-itim text-gray-800 bg-white
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition cursor-pointer"
                            >
                                {monthOptions.map((opt) => (
                                    <option key={opt.months} value={opt.months}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* ปุ่มคำนวณ (สีน้ำเงิน) และ รีเซ็ต (สีเทา) */}
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
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-kanit font-semibold
                                           py-2.5 rounded-xl transition duration-200 cursor-pointer"
                            >
                                รีเซ็ต
                            </button>
                        </div>
                    </form>

                    {/* ส่วนแสดงผลลัพธ์ */}
                    {result && (
                        <div className="mt-6 p-5 rounded-xl border border-blue-200 bg-blue-50 transition-all duration-300">
                            <div className="text-center pb-4 border-b border-blue-200">
                                <p className="font-kanit text-gray-600 text-sm">
                                    ค่างวดต่อเดือน
                                </p>
                                <p className="font-kanit text-3xl font-bold text-blue-700 mt-1">
                                    {result.monthlyInstallment.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    <span className="text-lg font-normal text-gray-600 ml-1.5">บาท/เดือน</span>
                                </p>
                                {result.borrowerName && (
                                    <p className="font-itim text-sm text-gray-600 mt-1">
                                        ผู้ขอสินเชื่อ: <span className="font-semibold text-gray-800">{result.borrowerName}</span>
                                    </p>
                                )}
                            </div>

                            {/* สรุปรายละเอียดการคำนวณ */}
                            <div className="mt-4 space-y-2 font-itim text-sm text-gray-700">
                                <div className="flex justify-between">
                                    <span>ราคารถยนต์:</span>
                                    <span className="font-semibold">{result.price.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>เงินดาวน์ ({result.downPercent}%):</span>
                                    <span className="font-semibold text-emerald-600">{result.downPaymentAmount.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>ยอดจัดไฟแนนซ์:</span>
                                    <span className="font-semibold">{result.financeAmount.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>อัตราดอกเบี้ย:</span>
                                    <span className="font-semibold">{result.rate}% ต่อปี ({result.years} ปี)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>ดอกเบี้ยทั้งหมด:</span>
                                    <span className="font-semibold text-amber-600">{result.totalInterest.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท</span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-blue-200 text-base font-kanit font-bold text-blue-800">
                                    <span>ยอดรวมทั้งหมดที่ต้องผ่อน:</span>
                                    <span>{result.totalPayment.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} บาท</span>
                                </div>
                            </div>
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
