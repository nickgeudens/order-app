import { FaPlus, FaTrash, FaMinus } from 'react-icons/fa';

export default function Item(props) {
  const { item, increment, decrement, reset } = props;
  return (
    <div className="w-full md:w-1/3 pb-2">
      <div className={`rounded-lg shadow-sm bg-white ${item.amount > 0 ? 'ring-2 ring-primary' : ''}`}>
        <div className="flex">
          <div
            className={`flex flex-col justify-between w-full cursor-pointer ${item.unavailable ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={item.unavailable ? undefined : increment}
          >
            <div className="flex items-center">
              <div className="m-3 relative">
                <img
                  className="max-w-[3rem] max-h-[3rem] rounded object-contain"
                  src={item.picture}
                  alt={item.name}
                />
                {item.amount > 0 ? (
                  <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full px-2 py-1 text-xs font-bold">
                    {item.amount}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col m-2 mr-auto">
                <p className="m-0 font-bold">{item.name}</p>
                <p className="m-0 text-gray-500 text-sm">{item.description}</p>
                <p className="m-0 text-sm">€{item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex mx-3 my-2 items-center">
              {item.unavailable ? (
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">uitverkocht</span>
              ) : (
                <FaPlus style={{ filter: 'opacity(20%)' }} />
              )}
            </div>
          </div>
          {item.amount > 0 && (
            <button
              className="px-3 bg-red-500 text-white rounded-r-lg hover:bg-red-600 transition-all"
              style={{ borderRadius: '0px 0.5rem 0.5rem 0px' }}
              onClick={decrement}
            >
              <FaMinus />
            </button>
          )}
        </div>
      </div>
      {/*
      <Modal ... />
      */}
    </div>
  );
}