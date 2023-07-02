namespace MusicAppApi.Helpers.Extensions.Pagination
{
    public class PageParams
    {
        private const int MaxPageSize = 50;


        private int _paginator = 1;
        public int PageNumber
        {
            get
            {
                return _paginator;
            }
            set
            {
                _paginator = value;
            }
        }
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
    }
}