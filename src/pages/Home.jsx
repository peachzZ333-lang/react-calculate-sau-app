import calculate from './../assets/calculate.png';
import CardMenu from './../components/CardMenu';
import bmi from './../assets/bmi.png';
import bmr from './../assets/bmr.png';
import car from './../assets/car.png';
import Footer from './../components/Footer';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-slate-50">
            <div>
                {/* ส่วนแสดงรูป */}
                <div className="flex justify-center mt-16 md:mt-24">
                    <img src={calculate} alt="calculate" className="w-28 md:w-32 drop-shadow-sm" />
                </div>

                {/* ส่วนแสดงชื่อแอป */}
                <div className="flex flex-col items-center mt-6 text-center px-4">
                    <h1 className="font-kanit text-3xl md:text-4xl font-bold text-blue-700">
                        เครื่องมือคำนวณออนไลน์
                    </h1>
                    <p className="font-itim text-lg md:text-xl text-blue-500 mt-2">
                        เลือกการคำนวณที่คุณต้องการจากเมนูด้านล่าง
                    </p>
                </div>

                {/* ส่วนของแสดง CardMenu ที่สร้างไว้ พร้อมส่ง props 4 ตัวตามคำสั่ง */}
                <div className="flex flex-wrap justify-center mt-12 gap-8 px-6 max-w-6xl mx-auto">
                    <CardMenu
                        showTitle="BMI (ดัชนีมวลกาย)"
                        showPic={bmi}
                        showDetail="คำนวณค่าน้ำหนักของคุณว่าเหมาะสมกับส่วนสูงหรือไม่"
                        routePath="/bmi"
                    />

                    <CardMenu
                        showTitle="BMR (อัตราเผาผลาญ)"
                        showPic={bmr}
                        showDetail="คำนวณอัตราการเผาผลาญที่ร่างกายต้องการ"
                        routePath="/bmr"
                    />

                    <CardMenu
                        showTitle="การผ่อนชำระรถยนต์"
                        showPic={car}
                        showDetail="คำนวณการผ่อนชำระรถยนต์ต่อเดือน"
                        routePath="/car"
                    />
                </div>
            </div>

            {/* ส่วนของแสดง Footer */}
            <Footer />
        </div>
    );
}
