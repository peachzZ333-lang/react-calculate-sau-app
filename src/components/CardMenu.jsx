import { Link } from 'react-router';

export default function CardMenu({
    showTitle,
    title,
    showPic,
    image,
    showDetail,
    detail,
    routePath,
    linkTo,
    to,
}) {
    const cardTitle = showTitle || title;
    const cardPic = showPic || image;
    const cardDetail = showDetail || detail;
    const targetRoute = routePath || linkTo || to;

    const cardContent = (
        <div className="border border-gray-200 p-6 rounded-2xl
                        w-80 min-h-80 shadow-lg bg-white
                        flex flex-col items-center justify-center gap-3
                        hover:shadow-2xl hover:-translate-y-2 hover:border-blue-400
                        transition-all duration-300 cursor-pointer">
            {/* แสดงรูป */}
            <img
                src={cardPic}
                alt={cardTitle}
                className="w-28 h-28 object-contain transition-transform duration-300 hover:scale-105"
            />

            {/* แสดงชื่อการคำนวณ */}
            <p className="font-kanit font-bold text-xl text-blue-700 text-center">
                {cardTitle}
            </p>

            {/* แสดงคำอธิบาย */}
            <p className="font-itim text-sm text-gray-500 text-center">
                {cardDetail}
            </p>
        </div>
    );

    if (targetRoute) {
        return (
            <Link to={targetRoute} className="block no-underline">
                {cardContent}
            </Link>
        );
    }

    return cardContent;
}
