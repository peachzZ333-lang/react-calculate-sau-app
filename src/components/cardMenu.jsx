
export default function CardMenu({ showTitle, showPic, showDetail }) {
    return (
        <div className="border border-gray-200 p-5 rounded-2xl
                        w-80 min-h-80 shadow-xl bg-white
                        flex flex-col items-center justify-center gap-3
                        hover:shadow-2xl hover:-translate-y-1
                        transition duration-300">

            {/* แสดงรูป */}
            <img
                src={showPic}
                alt="รูปคำนวณ"
                className="w-28 h-28 object-contain"
            />

            {/* แสดงชื่อการคำนวณ */}
            <p className="font-kanit font-bold text-xl text-red-500 text-center">
                {showTitle}
            </p>

            {/* แสดงคำอธิบาย */}
            <p className="font-charm text-sm text-center">
                {showDetail}
            </p>
        </div>
    )
}
