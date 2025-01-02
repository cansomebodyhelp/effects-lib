import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

let categoryListDuration = new Trend('categoryListDuration');

export default function () {
  let res = http.get('https://lib-back-ab58.onrender.com/api/categories');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  categoryListDuration.add(res.timings.duration);

  sleep(1);
}
