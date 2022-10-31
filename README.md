Необходимо создать приложение, содержащее зону отображение плана помещения в правой части экрана (план предоставляется во вложении в формате .geojson) c возможностью его зуммирования.
Координата левой нижней точки отображения плана относительно карты:
53.91687819154794 - широта
27.63435423374176 - долгота

Зум карты по умолчанию – достаточный, чтоб в область просмотра поместился весь план здания.
В левой части экрана должен быть выведен список персон с отображением аватарки и ФИО.
Список должен выводиться с постраничным выводом по 3 записи на страницу.
Запрос для получения списка персон:
GET​/api​/get_all_people

Аватарка – используем изображение, ссылка на которое указана в параметре "image_ref"
ФИО – параметры "name", "midname", "surname"

Описание запроса во вложенном файле openapi_4_3_1.yaml
Адрес сервера: 213.184.245.66
Порт: 5010

?filter=name,sex,begin_birthdate,end_birthdate,status,department,position
?sorting_params=sorting_type,sorting_order
?page=
?page_len=

/api/get_all_people:
get:
    tags:
    - People
    parameters:
    - name: filter
        in: query
        required: false
        schema:
        type: object
        properties:
            name:
            type: string
            example: Ivan
            sex:
            type: integer
            example: '1'
            begin_birthdate:
            type: string
            example: '2019-06-01 00:00:00'
            end_birthdate:
            type: string
            example: '2019-06-01 00:00:00'
            status:
            type: integer
            example: '3'
            department:
            type: string
            example: Security
            position:
            type: string
            example: manager
        minProperties: 0
        maxProperties: 7
    - name: sorting_params
        in: query
        required: false
        schema:
        type: object
        description: ''
        properties:
            sorting_type:
            description: Sorting type can be 'name' or 'age'
            type: string
            example: event_time
            sorting_order:
            description: Sorting order can be 'asc' or 'desc'
            type: string
            example: asc
        minProperties: 0
        maxProperties: 2
    - name: page
        in: query
        required: false
        schema:
        type: integer
        example: '3'
    - name: page_len
        in: query
        required: false
        schema:
        type: integer
        example: '300'
    responses:
    '200':
        description: successful operation
        content:
        application/json:
            schema:
            type: object
            properties:
                status:
                type: string
                example: OK
                data:
                type: array
                items:
                    $ref: '#/components/schemas/person'
    x-error:
        description: Error
        content:
        application/json:
            schema:
            $ref: '#/components/schemas/errorModel'
    x-authorizationError:
        description: Authorization error
        content:
        text/html:
            schema:
            type: string
            example: Unauthorized Access
    security:
    - basicAuth: []
    - bearerAuth: []