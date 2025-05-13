using AutoMapper;
using peachtree_bank_backend.Data.Models.DTOs;
using peachtree_bank_backend.Data.ViewModels;
using peachtree_bank_backend.Models;

namespace peachtree_bank_backend;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        AddGlobalIgnore("CreatedDateTime");

        CreateUtilityMaps();
        CreateTransactionMaps();
    }

    private void CreateUtilityMaps()
    {
        CreateMap(typeof(PaginatedResponse<,>), typeof(PaginatedResponse<,>));
    }

    private void CreateTransactionMaps()
    {
        CreateMap<Transaction, TransactionResult>()
            .ForMember(dest => dest.CreatedDateTime, opt => opt.MapFrom(src => DateOnly.FromDateTime(src.CreatedDateTime)));
        CreateMap<TransactionCreateModel, Transaction>()
            .ForMember(x => x.CreatedDateTime, opt => opt.MapFrom(_ => DateTime.Now));
    }
}