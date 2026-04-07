// components/common/Loading.jsx
export const Loading = ({ size = 'md', text = 'Loading...', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-4">
        <div className={`${sizeClasses[size]} animate-spin`}>
          <div className="w-full h-full border-4 border-gray-200 dark:border-gray-700 border-t-primary-600 rounded-full"></div>
        </div>
        {text && (
          <p className="text-gray-600 dark:text-gray-400 font-medium">{text}</p>
        )}
      </div>
    </div>
  );
};

export default Loading;