using System;

namespace IZGWeb.Logger
{
    public interface ILogger
    {
        /// <summary>
        /// Log an event through the implementing logging service
        /// </summary>
        /// <param name="message">Plain language log content</param>
        /// <param name="source">Description of the source of the log</param>
        /// <param name="logLevel">Level of the log being performed</param>
        void LogEvent(DateTime logTime, string message, string source, LogLevel logLevel);
    }
}