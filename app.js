const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');

const app = express();
// app.use(require('connect-history-api-fallback')());
app.enable('trust proxy');

const distDir = path.join(__dirname, 'client/dist');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distDir));
}

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Global middleware
//Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//Security HTTP headers
app.use(helmet());

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// const corsOptions = {
//   origin: 'https://hidden-springs-81084.herokuapp.com/',
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

app.use(cors());
app.options('*', cors());

//Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Try again later.',
});
app.use('/api', limiter);

//Body parser, reading data from the body into req.body
app.use(
  express.json({
    limit: '10kb',
  })
);
app.use(cookieParser());

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());
//Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

app.use(compression());

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//mounting routers
app.get('/', function (req, res) {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
