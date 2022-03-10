const axios = require('axios');
const pool = require('./pool.js');

module.exports = {
  readAll: function (page = 1, count = 10) {
    return pool.connect().then((client) => {
      const query = `SELECT * FROM products
        LIMIT $2 OFFSET $1`;
      return client
        .query(query, [page * count - count, count])
        .then((res) => {
          client.release();
          return res.rows;
        })
        .catch((err) => {
          client.release();
          throw err;
        });
    });
  },

  readProduct: function (productId) {
    return pool.connect().then((client) => {
      const query = `SELECT
      json_build_object(
        'id', p.id,
        'campus', 'hr-lax',
        'name', p.name,
        'slogan', p.slogan,
        'description', p.description,
        'category', p.category,
        'features',
        (SELECT coalesce
          (array_agg
            (json_build_object(
              'feature', f.feature,
              'value', f.value)),
              '{}')
        AS features FROM features f WHERE p.id = f.current_product_id)
      )
  FROM products p WHERE p.id = $1`

      return client
        .query(query, [productId])
        .then((res) => {
          client.release();
          return res.rows[0].json_build_object;
        })
        .catch((err) => {
          client.release();
          throw err;
        });
    });
  },

  readStyles: function (productId) {
    return pool.connect().then((client) => {
      const query =
      `SELECT
            json_build_object(
              'product_id', ${productId},
              'results',
              (SELECT coalesce
                (array_agg
                  (json_build_object(
                    'style_id', s.id,
                    'name', s.name,
                    'original_price', s.original_price,
                    'sale_price', s.sale_price,
                    'default?', s.default_style,
                    'photos', (SELECT coalesce
                      (array_agg
                        (json_build_object(
                          'thumbnail_url', p.thumbnail_url,
                          'url', p.url
                        )), '{}')
                        AS photos FROM photos p WHERE p.style_id = s.id),
                        'skus', (SELECT coalesce
                          (json_object_agg
                            (skus.id, json_build_object(
                              'quantity', skus.quantity,
                              'size', skus.size
                            )), '{}')
                            AS data FROM skus WHERE skus.styleId = s.id)
                        )), '{}')
              AS results FROM styles s WHERE s.current_product_id = $1)
            )`;
      return client
        .query(query, [productId])
        .then((res) => {
          client.release();
          return res.rows[0].json_build_object;
        })
        .catch((err) => {
          client.release();
          throw err;
        });
    });
  },

  readRelated: function (productId) {
    console.log('hello', productId);
    return pool.connect().then((client) => {
      const query = `select array_agg(related_products.related_product_id)
      from related_products
      where related_products.current_product_id = $1`;
      return client
        .query(query, [productId])
        .then((res) => {
          client.release();
          return res.rows[0].array_agg;
        })
        .catch((err) => {
          client.release();
          throw err;
        });
    });
  },
};

// `SELECT
//       json_build_object(
//         'product_id', ${productId},
//         'results',
//         (SELECT coalesce
//           (array_agg
//             (json_build_object(
//               'style_id', s.id,
//               'name', s.name,
//               'original_price', s.original_price,
//               'sale_price', s.sale_price,
//               'default?', s.default_style,
//               'photos', (SELECT coalesce
//                 (array_agg
//                   (json_build_object(
//                     'thumbnail_url', p.thumbnail_url,
//                     'url', p.url
//                   )), '{}')
//                   AS photos FROM photos p WHERE p.style_id = s.id),
//                   'skus', 'tbd'
//                   )), '{}')
//         AS results FROM styles s WHERE s.current_product_id = $1)
//       )`;