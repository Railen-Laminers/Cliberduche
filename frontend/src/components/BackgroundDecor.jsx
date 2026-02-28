import React from 'react';

/**
 * BackgroundDecor – Adds subtle patterns and blurred circles to any section.
 *
 * @param {Object} props
 * @param {'dots'|'grid'|'lines'} props.pattern - Type of background pattern.
 * @param {'green'|'blue'|'yellow'|'gray'} props.color - Color theme for pattern and circles.
 * @param {number} props.opacity - Opacity of the pattern (0 to 1). Default 0.15.
 * @param {boolean} props.blurCircles - Whether to show two large blurred circles. Default true.
 * @param {string} props.className - Additional classes for the container.
 */
const BackgroundDecor = ({
    pattern = 'dots',
    color = 'green',
    opacity = 0.15,
    blurCircles = true,
    className = '',
}) => {
    // Map color names to Tailwind classes and CSS color values
    const colorClasses = {
        green: { circle: 'bg-green-300', pattern: '#22c55e' },
        blue: { circle: 'bg-blue-300', pattern: '#3b82f6' },
        yellow: { circle: 'bg-yellow-200', pattern: '#eab308' },
        gray: { circle: 'bg-gray-300', pattern: '#9ca3af' },
    };

    // Pattern style definitions
    const patternStyles = {
        dots: {
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '40px 40px',
        },
        grid: {
            backgroundImage:
                'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '60px 60px',
        },
        lines: {
            backgroundImage:
                'repeating-linear-gradient(45deg, currentColor 0px, currentColor 2px, transparent 2px, transparent 20px)',
        },
    };

    const selectedColor = colorClasses[color] || colorClasses.green;

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
            {/* Pattern overlay */}
            <div
                className="absolute inset-0"
                style={{
                    ...patternStyles[pattern],
                    color: selectedColor.pattern,
                    opacity: opacity,
                }}
            />

            {/* Blur circles (optional) */}
            {blurCircles && (
                <>
                    <div
                        className={`absolute top-20 left-10 w-80 h-80 ${selectedColor.circle} rounded-full blur-3xl opacity-40`}
                    />
                    <div
                        className={`absolute bottom-20 right-10 w-80 h-80 ${selectedColor.circle} rounded-full blur-3xl opacity-40`}
                    />
                </>
            )}
        </div>
    );
};

export default BackgroundDecor;